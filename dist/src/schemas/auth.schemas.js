"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResponseSchema = exports.authResponseSchema = exports.refreshTokenSchema = exports.loginSchema = exports.registerSchema = exports.devRegisterSchema = void 0;
const zod_1 = require("zod");
const users_1 = require("../models/users");
// Registration schemas
exports.devRegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    username: zod_1.z.string().min(3, "Username must be at least 3 characters"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    username: zod_1.z.string().min(3, "Username must be at least 3 characters"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    role: zod_1.z.enum(users_1.roles).default("ADMIN"),
});
// Login schema
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    password: zod_1.z.string().min(1, "Password is required"),
});
// Refresh token schema
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, "Refresh token is required").optional(),
});
// Response schemas
exports.authResponseSchema = zod_1.z.object({
    user: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        username: zod_1.z.string(),
        role: zod_1.z.enum(users_1.roles),
        ownerId: zod_1.z.string().nullable(),
        isActive: zod_1.z.boolean(),
        createdAt: zod_1.z.date(),
        updatedAt: zod_1.z.date(),
    }),
    tokens: zod_1.z.object({
        accessToken: zod_1.z.string(),
        refreshToken: zod_1.z.string().optional(),
    }),
});
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
//# sourceMappingURL=auth.schemas.js.map