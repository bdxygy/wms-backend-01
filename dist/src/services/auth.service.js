"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const users_1 = require("../models/users");
const jwt_1 = require("../utils/jwt");
const cookies_1 = require("../utils/cookies");
const drizzle_orm_1 = require("drizzle-orm");
const http_exception_1 = require("hono/http-exception");
const crypto_1 = require("crypto");
class AuthService {
    static async devRegister(data, c) {
        // Check if user already exists
        const existingUser = await database_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.username, data.username));
        if (existingUser.length > 0) {
            throw new http_exception_1.HTTPException(400, { message: "Username already exists" });
        }
        // Hash password
        const passwordHash = await bcryptjs_1.default.hash(data.password, 10);
        // Create user with OWNER role (for dev registration)
        const userId = (0, crypto_1.randomUUID)();
        const user = await database_1.db
            .insert(users_1.users)
            .values({
            id: userId,
            name: data.name,
            username: data.username,
            passwordHash,
            role: "OWNER",
            ownerId: null, // OWNER has no owner
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
            .returning();
        if (!user[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to create user" });
        }
        // Generate tokens
        const tokens = await jwt_1.JwtUtils.generateTokenPair({
            userId: user[0].id,
            role: user[0].role,
            ownerId: user[0].ownerId || undefined,
        });
        // Set refresh token in cookie if context is provided
        if (c) {
            cookies_1.CookieUtils.setRefreshTokenCookie(c, tokens.refreshToken);
        }
        return {
            user: {
                id: user[0].id,
                name: user[0].name,
                username: user[0].username,
                role: user[0].role,
                ownerId: user[0].ownerId,
                isActive: user[0].isActive,
                createdAt: user[0].createdAt,
                updatedAt: user[0].updatedAt,
            },
            tokens: {
                accessToken: tokens.accessToken,
                refreshToken: c ? undefined : tokens.refreshToken, // Only return refresh token if no context (backward compatibility)
            },
        };
    }
    static async register(data, createdBy, c) {
        // Check if user already exists
        const existingUser = await database_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.username, data.username));
        if (existingUser.length > 0) {
            throw new http_exception_1.HTTPException(400, { message: "Username already exists" });
        }
        // Get creator to determine ownership
        const creator = await database_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.id, createdBy));
        if (!creator[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Creator not found" });
        }
        // Determine owner ID based on creator's role
        let ownerId;
        if (creator[0].role === "OWNER") {
            ownerId = creator[0].id;
        }
        else {
            ownerId = creator[0].ownerId;
        }
        // Hash password
        const passwordHash = await bcryptjs_1.default.hash(data.password, 10);
        // Create user
        const userId = (0, crypto_1.randomUUID)();
        const user = await database_1.db
            .insert(users_1.users)
            .values({
            id: userId,
            name: data.name,
            username: data.username,
            passwordHash,
            role: data.role,
            ownerId,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
            .returning();
        if (!user[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to create user" });
        }
        // Generate tokens
        const tokens = await jwt_1.JwtUtils.generateTokenPair({
            userId: user[0].id,
            role: user[0].role,
            ownerId: user[0].ownerId || undefined,
        });
        // Set refresh token in cookie if context is provided
        if (c) {
            cookies_1.CookieUtils.setRefreshTokenCookie(c, tokens.refreshToken);
        }
        return {
            user: {
                id: user[0].id,
                name: user[0].name,
                username: user[0].username,
                role: user[0].role,
                ownerId: user[0].ownerId,
                isActive: user[0].isActive,
                createdAt: user[0].createdAt,
                updatedAt: user[0].updatedAt,
            },
            tokens: {
                accessToken: tokens.accessToken,
                refreshToken: c ? undefined : tokens.refreshToken, // Only return refresh token if no context (backward compatibility)
            },
        };
    }
    static async login(data, c) {
        // Find user by username
        const user = await database_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.username, data.username));
        if (!user[0]) {
            throw new http_exception_1.HTTPException(401, { message: "Invalid credentials" });
        }
        // Check if user is active
        if (!user[0].isActive) {
            throw new http_exception_1.HTTPException(401, { message: "Account is deactivated" });
        }
        // Verify password
        const passwordMatch = await bcryptjs_1.default.compare(data.password, user[0].passwordHash);
        if (!passwordMatch) {
            throw new http_exception_1.HTTPException(401, { message: "Invalid credentials" });
        }
        // Generate tokens
        const tokens = await jwt_1.JwtUtils.generateTokenPair({
            userId: user[0].id,
            role: user[0].role,
            ownerId: user[0].ownerId || undefined,
        });
        // Set refresh token in cookie if context is provided
        if (c) {
            cookies_1.CookieUtils.setRefreshTokenCookie(c, tokens.refreshToken);
        }
        return {
            user: {
                id: user[0].id,
                name: user[0].name,
                username: user[0].username,
                role: user[0].role,
                ownerId: user[0].ownerId,
                isActive: user[0].isActive,
                createdAt: user[0].createdAt,
                updatedAt: user[0].updatedAt,
            },
            tokens: {
                accessToken: tokens.accessToken,
                refreshToken: c ? undefined : tokens.refreshToken, // Only return refresh token if no context (backward compatibility)
            },
        };
    }
    static async refresh(data, c) {
        try {
            // Get refresh token from cookie if available, otherwise from request body
            let refreshToken = data.refreshToken;
            if (c && !refreshToken) {
                const cookieToken = cookies_1.CookieUtils.getRefreshTokenFromCookie(c);
                if (cookieToken) {
                    refreshToken = cookieToken;
                }
            }
            if (!refreshToken) {
                throw new http_exception_1.HTTPException(401, { message: "Refresh token not provided" });
            }
            // Verify refresh token
            const decoded = await jwt_1.JwtUtils.verifyRefreshToken(refreshToken);
            // Find user to ensure they still exist and are active
            const user = await database_1.db
                .select()
                .from(users_1.users)
                .where((0, drizzle_orm_1.eq)(users_1.users.id, decoded.userId));
            if (!user[0]) {
                throw new http_exception_1.HTTPException(401, { message: "User not found" });
            }
            if (!user[0].isActive) {
                throw new http_exception_1.HTTPException(401, { message: "Account is deactivated" });
            }
            // Generate new tokens
            const tokens = await jwt_1.JwtUtils.generateTokenPair({
                userId: user[0].id,
                role: user[0].role,
                ownerId: user[0].ownerId || undefined,
            });
            // Set new refresh token in cookie if context is provided
            if (c) {
                cookies_1.CookieUtils.setRefreshTokenCookie(c, tokens.refreshToken);
            }
            return {
                user: {
                    id: user[0].id,
                    name: user[0].name,
                    username: user[0].username,
                    role: user[0].role,
                    ownerId: user[0].ownerId,
                    isActive: user[0].isActive,
                    createdAt: user[0].createdAt,
                    updatedAt: user[0].updatedAt,
                },
                tokens: {
                    accessToken: tokens.accessToken,
                    refreshToken: c ? undefined : tokens.refreshToken, // Only return refresh token if no context (backward compatibility)
                },
            };
        }
        catch (error) {
            throw new http_exception_1.HTTPException(401, { message: "Invalid refresh token" });
        }
    }
    static async logout(c) {
        // Clear refresh token cookie if context is provided
        if (c) {
            cookies_1.CookieUtils.clearRefreshTokenCookie(c);
        }
        return {
            message: "Logged out successfully",
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map