"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthMiddleware = exports.authMiddleware = void 0;
const factory_1 = require("hono/factory");
const http_exception_1 = require("hono/http-exception");
const jwt_1 = require("../utils/jwt");
const database_1 = require("../config/database");
const users_1 = require("../models/users");
const drizzle_orm_1 = require("drizzle-orm");
exports.authMiddleware = (0, factory_1.createMiddleware)(async (c, next) => {
    try {
        // Get token from Authorization header
        const authHeader = c.req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new http_exception_1.HTTPException(401, { message: "Missing or invalid authorization header" });
        }
        const token = authHeader.slice(7); // Remove "Bearer " prefix
        // Verify JWT token
        const decoded = await jwt_1.JwtUtils.verifyAccessToken(token);
        // Find user in database
        const user = await database_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.id, decoded.userId));
        if (!user[0]) {
            throw new http_exception_1.HTTPException(401, { message: "User not found" });
        }
        // Check if user is active
        if (!user[0].isActive) {
            throw new http_exception_1.HTTPException(401, { message: "Account is deactivated" });
        }
        // Inject user into context
        c.set("user", user[0]);
        await next();
    }
    catch (error) {
        if (error instanceof http_exception_1.HTTPException) {
            throw error;
        }
        // Handle JWT verification errors
        throw new http_exception_1.HTTPException(401, { message: "Invalid or expired token" });
    }
});
// Optional middleware - doesn't throw error if no token
exports.optionalAuthMiddleware = (0, factory_1.createMiddleware)(async (c, next) => {
    try {
        const authHeader = c.req.header("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.slice(7);
            const decoded = await jwt_1.JwtUtils.verifyAccessToken(token);
            const user = await database_1.db
                .select()
                .from(users_1.users)
                .where((0, drizzle_orm_1.eq)(users_1.users.id, decoded.userId));
            if (user[0] && user[0].isActive) {
                c.set("user", user[0]);
            }
        }
        await next();
    }
    catch (error) {
        // Silently continue without user context
        await next();
    }
});
//# sourceMappingURL=auth.middleware.js.map