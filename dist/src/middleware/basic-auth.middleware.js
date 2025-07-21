"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuthMiddleware = void 0;
const http_exception_1 = require("hono/http-exception");
const env_1 = require("../config/env");
const basicAuthMiddleware = async (c, next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        throw new http_exception_1.HTTPException(401, { message: "Basic authentication required" });
    }
    const base64Credentials = authHeader.slice(6); // Remove "Basic " prefix
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");
    if (username !== env_1.env.BASIC_AUTH_USERNAME || password !== env_1.env.BASIC_AUTH_PASSWORD) {
        throw new http_exception_1.HTTPException(401, { message: "Invalid credentials" });
    }
    await next();
};
exports.basicAuthMiddleware = basicAuthMiddleware;
//# sourceMappingURL=basic-auth.middleware.js.map