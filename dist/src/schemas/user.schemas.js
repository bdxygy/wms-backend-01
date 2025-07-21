"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userListResponseSchema = exports.userResponseSchema = exports.userIdParamSchema = exports.listUsersQuerySchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const users_1 = require("../models/users");
// Create user schema
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    username: zod_1.z.string().min(3, "Username must be at least 3 characters"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    role: zod_1.z.enum(users_1.roles),
});
// Update user schema
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").optional(),
    username: zod_1.z.string().min(3, "Username must be at least 3 characters").optional(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters").optional(),
    role: zod_1.z.enum(users_1.roles).optional(),
    isActive: zod_1.z.boolean().optional(),
});
// Query parameters for list users
exports.listUsersQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(10),
    search: zod_1.z.string().optional(),
    role: zod_1.z.enum(users_1.roles).optional(),
    isActive: zod_1.z.coerce.boolean().optional(),
});
// User ID parameter schema
exports.userIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid user ID format"),
});
// User response schema
exports.userResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    username: zod_1.z.string(),
    role: zod_1.z.enum(users_1.roles),
    ownerId: zod_1.z.string().nullable(),
    isActive: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// User list response schema
exports.userListResponseSchema = zod_1.z.object({
    users: zod_1.z.array(exports.userResponseSchema),
    pagination: zod_1.z.object({
        page: zod_1.z.number(),
        limit: zod_1.z.number(),
        total: zod_1.z.number(),
        totalPages: zod_1.z.number(),
        hasNext: zod_1.z.boolean(),
        hasPrev: zod_1.z.boolean(),
    }),
});
//# sourceMappingURL=user.schemas.js.map