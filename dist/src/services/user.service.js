"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = require("crypto");
const database_1 = require("../config/database");
const users_1 = require("../models/users");
const drizzle_orm_1 = require("drizzle-orm");
const http_exception_1 = require("hono/http-exception");
class UserService {
    static async createUser(data, createdBy) {
        // Check if user already exists
        const existingUser = await database_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.username, data.username));
        if (existingUser.length > 0) {
            throw new http_exception_1.HTTPException(400, { message: "Username already exists" });
        }
        // Determine owner ID based on creator's role
        let ownerId;
        if (createdBy.role === "OWNER") {
            ownerId = createdBy.id;
        }
        else {
            ownerId = createdBy.ownerId;
        }
        // Hash password
        const passwordHash = await bcryptjs_1.default.hash(data.password, 10);
        // Create user
        const userId = (0, crypto_1.randomUUID)();
        const user = await database_1.db.insert(users_1.users).values({
            id: userId,
            name: data.name,
            username: data.username,
            passwordHash,
            role: data.role,
            ownerId,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning();
        if (!user[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to create user" });
        }
        return {
            id: user[0].id,
            name: user[0].name,
            username: user[0].username,
            role: user[0].role,
            ownerId: user[0].ownerId,
            isActive: user[0].isActive,
            createdAt: user[0].createdAt,
            updatedAt: user[0].updatedAt,
        };
    }
    static async getUserById(id, requestingUser) {
        const user = await database_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.id, id));
        if (!user[0]) {
            throw new http_exception_1.HTTPException(404, { message: "User not found" });
        }
        return {
            id: user[0].id,
            name: user[0].name,
            username: user[0].username,
            role: user[0].role,
            ownerId: user[0].ownerId,
            isActive: user[0].isActive,
            createdAt: user[0].createdAt,
            updatedAt: user[0].updatedAt,
        };
    }
    static async listUsers(query, requestingUser) {
        // Build where conditions
        const conditions = [];
        // Owner scoping
        if (requestingUser.role === "OWNER") {
            conditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.eq)(users_1.users.ownerId, requestingUser.id), (0, drizzle_orm_1.eq)(users_1.users.id, requestingUser.id)));
        }
        else {
            conditions.push((0, drizzle_orm_1.eq)(users_1.users.ownerId, requestingUser.ownerId));
        }
        // Search filter
        if (query.search) {
            conditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.like)(users_1.users.name, `%${query.search}%`), (0, drizzle_orm_1.like)(users_1.users.username, `%${query.search}%`)));
        }
        // Role filter
        if (query.role) {
            conditions.push((0, drizzle_orm_1.eq)(users_1.users.role, query.role));
        }
        // Active filter
        if (query.isActive !== undefined) {
            conditions.push((0, drizzle_orm_1.eq)(users_1.users.isActive, query.isActive));
        }
        // Exclude deleted users
        conditions.push((0, drizzle_orm_1.isNull)(users_1.users.deletedAt));
        const whereClause = (0, drizzle_orm_1.and)(...conditions);
        // Get total count
        const totalResult = await database_1.db
            .select({ count: (0, drizzle_orm_1.count)() })
            .from(users_1.users)
            .where(whereClause);
        const total = totalResult[0].count;
        const totalPages = Math.ceil(total / query.limit);
        const offset = (query.page - 1) * query.limit;
        // Get users with pagination
        const userList = await database_1.db
            .select()
            .from(users_1.users)
            .where(whereClause)
            .limit(query.limit)
            .offset(offset)
            .orderBy(users_1.users.createdAt);
        const userResponse = userList.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            role: user.role,
            ownerId: user.ownerId,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));
        return {
            users: userResponse,
            pagination: {
                page: query.page,
                limit: query.limit,
                total,
                totalPages,
                hasNext: query.page < totalPages,
                hasPrev: query.page > 1,
            },
        };
    }
    static async updateUser(id, data, requestingUser) {
        // Find user to update
        const existingUser = await database_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.id, id));
        if (!existingUser[0]) {
            throw new http_exception_1.HTTPException(404, { message: "User not found" });
        }
        // Check username uniqueness if updating username
        if (data.username && data.username !== existingUser[0].username) {
            const usernameExists = await database_1.db
                .select()
                .from(users_1.users)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(users_1.users.username, data.username), (0, drizzle_orm_1.eq)(users_1.users.id, id) // Exclude current user
            ));
            if (usernameExists.length > 0) {
                throw new http_exception_1.HTTPException(400, { message: "Username already exists" });
            }
        }
        // Prepare update data
        const updateData = {
            updatedAt: new Date(),
        };
        if (data.name)
            updateData.name = data.name;
        if (data.username)
            updateData.username = data.username;
        if (data.role)
            updateData.role = data.role;
        if (data.isActive !== undefined)
            updateData.isActive = data.isActive;
        // Hash password if provided
        if (data.password) {
            updateData.passwordHash = await bcryptjs_1.default.hash(data.password, 10);
        }
        // Update user
        const updatedUser = await database_1.db
            .update(users_1.users)
            .set(updateData)
            .where((0, drizzle_orm_1.eq)(users_1.users.id, id))
            .returning();
        if (!updatedUser[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to update user" });
        }
        return {
            id: updatedUser[0].id,
            name: updatedUser[0].name,
            username: updatedUser[0].username,
            role: updatedUser[0].role,
            ownerId: updatedUser[0].ownerId,
            isActive: updatedUser[0].isActive,
            createdAt: updatedUser[0].createdAt,
            updatedAt: updatedUser[0].updatedAt,
        };
    }
    static async deleteUser(id, requestingUser) {
        // Find user to delete
        const existingUser = await database_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.id, id));
        if (!existingUser[0]) {
            throw new http_exception_1.HTTPException(404, { message: "User not found" });
        }
        // Cannot delete self
        if (existingUser[0].id === requestingUser.id) {
            throw new http_exception_1.HTTPException(400, { message: "Cannot delete your own account" });
        }
        // Soft delete user
        await database_1.db
            .update(users_1.users)
            .set({
            deletedAt: new Date(),
            isActive: false,
            updatedAt: new Date(),
        })
            .where((0, drizzle_orm_1.eq)(users_1.users.id, id));
        return { message: "User deleted successfully" };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map