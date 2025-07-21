"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("../../src/index");
const database_1 = require("../../src/config/database");
const users_1 = require("../../src/models/users");
const drizzle_orm_1 = require("drizzle-orm");
const env_1 = require("../../src/config/env");
(0, vitest_1.describe)("Auth Routes", () => {
    (0, vitest_1.beforeEach)(async () => {
        // Clean up users table before each test
        await database_1.db.delete(users_1.users);
    });
    (0, vitest_1.describe)("POST /api/v1/auth/dev/register", () => {
        (0, vitest_1.it)("should register a new owner user with valid basic auth", async () => {
            const basicAuthHeader = `Basic ${Buffer.from(`${env_1.env.BASIC_AUTH_USERNAME}:${env_1.env.BASIC_AUTH_PASSWORD}`).toString("base64")}`;
            const response = await index_1.app.request("/api/v1/auth/dev/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: basicAuthHeader,
                },
                body: JSON.stringify({
                    name: "Owner User",
                    username: "owner",
                    password: "password123",
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(201);
            const data = await response.json();
            (0, vitest_1.expect)(data.success).toBe(true);
            (0, vitest_1.expect)(data.data.user.role).toBe("OWNER");
            (0, vitest_1.expect)(data.data.user.ownerId).toBe(null);
            (0, vitest_1.expect)(data.data.tokens.accessToken).toBeDefined();
            (0, vitest_1.expect)(data.data.tokens.refreshToken).toBeDefined();
        });
        (0, vitest_1.it)("should return 401 without basic auth", async () => {
            const response = await index_1.app.request("/api/v1/auth/dev/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "Owner User",
                    username: "owner",
                    password: "password123",
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(401);
        });
        (0, vitest_1.it)("should return 401 with invalid basic auth", async () => {
            const basicAuthHeader = `Basic ${Buffer.from("invalid:credentials").toString("base64")}`;
            const response = await index_1.app.request("/api/v1/auth/dev/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: basicAuthHeader,
                },
                body: JSON.stringify({
                    name: "Owner User",
                    username: "owner",
                    password: "password123",
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(401);
        });
        (0, vitest_1.it)("should return 400 for duplicate username", async () => {
            const basicAuthHeader = `Basic ${Buffer.from(`${env_1.env.BASIC_AUTH_USERNAME}:${env_1.env.BASIC_AUTH_PASSWORD}`).toString("base64")}`;
            // First registration
            await index_1.app.request("/api/v1/auth/dev/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: basicAuthHeader,
                },
                body: JSON.stringify({
                    name: "Owner User",
                    username: "owner",
                    password: "password123",
                }),
            });
            // Second registration with same username
            const response = await index_1.app.request("/api/v1/auth/dev/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: basicAuthHeader,
                },
                body: JSON.stringify({
                    name: "Another Owner",
                    username: "owner",
                    password: "password456",
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(400);
            const data = await response.json();
            (0, vitest_1.expect)(data.success).toBe(false);
            (0, vitest_1.expect)(data.error.message).toBe("Username already exists");
        });
        (0, vitest_1.it)("should return 400 for invalid data", async () => {
            const basicAuthHeader = `Basic ${Buffer.from(`${env_1.env.BASIC_AUTH_USERNAME}:${env_1.env.BASIC_AUTH_PASSWORD}`).toString("base64")}`;
            const response = await index_1.app.request("/api/v1/auth/dev/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: basicAuthHeader,
                },
                body: JSON.stringify({
                    name: "",
                    username: "ab",
                    password: "123",
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(400);
            const data = await response.json();
            (0, vitest_1.expect)(data.success).toBe(false);
            (0, vitest_1.expect)(data.error.code).toBe("VALIDATION_ERROR");
        });
    });
    (0, vitest_1.describe)("POST /api/v1/auth/login", () => {
        (0, vitest_1.beforeEach)(async () => {
            // Create a test user
            const basicAuthHeader = `Basic ${Buffer.from(`${env_1.env.BASIC_AUTH_USERNAME}:${env_1.env.BASIC_AUTH_PASSWORD}`).toString("base64")}`;
            await index_1.app.request("/api/v1/auth/dev/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: basicAuthHeader,
                },
                body: JSON.stringify({
                    name: "Test User",
                    username: "testuser",
                    password: "password123",
                }),
            });
        });
        (0, vitest_1.it)("should login with valid credentials", async () => {
            const response = await index_1.app.request("/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "testuser",
                    password: "password123",
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(200);
            const data = await response.json();
            (0, vitest_1.expect)(data.success).toBe(true);
            (0, vitest_1.expect)(data.data.user.username).toBe("testuser");
            (0, vitest_1.expect)(data.data.tokens.accessToken).toBeDefined();
            (0, vitest_1.expect)(data.data.tokens.refreshToken).toBeDefined();
        });
        (0, vitest_1.it)("should return 401 with invalid username", async () => {
            const response = await index_1.app.request("/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "nonexistent",
                    password: "password123",
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(401);
            const data = await response.json();
            (0, vitest_1.expect)(data.success).toBe(false);
            (0, vitest_1.expect)(data.error.message).toBe("Invalid credentials");
        });
        (0, vitest_1.it)("should return 401 with invalid password", async () => {
            const response = await index_1.app.request("/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "testuser",
                    password: "wrongpassword",
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(401);
            const data = await response.json();
            (0, vitest_1.expect)(data.success).toBe(false);
            (0, vitest_1.expect)(data.error.message).toBe("Invalid credentials");
        });
        (0, vitest_1.it)("should return 401 for deactivated user", async () => {
            // Deactivate the user
            await database_1.db.update(users_1.users).set({ isActive: false }).where((0, drizzle_orm_1.eq)(users_1.users.username, "testuser"));
            const response = await index_1.app.request("/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "testuser",
                    password: "password123",
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(401);
            const data = await response.json();
            (0, vitest_1.expect)(data.success).toBe(false);
            (0, vitest_1.expect)(data.error.message).toBe("Account is deactivated");
        });
        (0, vitest_1.it)("should return 400 for missing credentials", async () => {
            const response = await index_1.app.request("/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "",
                    password: "",
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(400);
            const data = await response.json();
            (0, vitest_1.expect)(data.success).toBe(false);
            (0, vitest_1.expect)(data.error.code).toBe("VALIDATION_ERROR");
        });
    });
    (0, vitest_1.describe)("POST /api/v1/auth/refresh", () => {
        let refreshToken;
        (0, vitest_1.beforeEach)(async () => {
            // Create a test user and get tokens
            const basicAuthHeader = `Basic ${Buffer.from(`${env_1.env.BASIC_AUTH_USERNAME}:${env_1.env.BASIC_AUTH_PASSWORD}`).toString("base64")}`;
            await index_1.app.request("/api/v1/auth/dev/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: basicAuthHeader,
                },
                body: JSON.stringify({
                    name: "Test User",
                    username: "testuser",
                    password: "password123",
                }),
            });
            const loginResponse = await index_1.app.request("/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "testuser",
                    password: "password123",
                }),
            });
            const loginData = await loginResponse.json();
            refreshToken = loginData.data.tokens.refreshToken;
        });
        (0, vitest_1.it)("should refresh tokens with valid refresh token", async () => {
            const response = await index_1.app.request("/api/v1/auth/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refreshToken,
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(200);
            const data = await response.json();
            (0, vitest_1.expect)(data.success).toBe(true);
            (0, vitest_1.expect)(data.data.user.username).toBe("testuser");
            (0, vitest_1.expect)(data.data.tokens.accessToken).toBeDefined();
            (0, vitest_1.expect)(data.data.tokens.refreshToken).toBeDefined();
        });
        (0, vitest_1.it)("should return 401 with invalid refresh token", async () => {
            const response = await index_1.app.request("/api/v1/auth/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refreshToken: "invalid-token",
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(401);
            const data = await response.json();
            (0, vitest_1.expect)(data.success).toBe(false);
            (0, vitest_1.expect)(data.error.message).toBe("Invalid refresh token");
        });
        (0, vitest_1.it)("should return 401 for deactivated user", async () => {
            // Deactivate the user
            await database_1.db.update(users_1.users).set({ isActive: false }).where((0, drizzle_orm_1.eq)(users_1.users.username, "testuser"));
            const response = await index_1.app.request("/api/v1/auth/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refreshToken,
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(401);
            const data = await response.json();
            (0, vitest_1.expect)(data.success).toBe(false);
            (0, vitest_1.expect)(data.error.message).toBe("Account is deactivated");
        });
        (0, vitest_1.it)("should return 400 for missing refresh token", async () => {
            const response = await index_1.app.request("/api/v1/auth/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refreshToken: "",
                }),
            });
            (0, vitest_1.expect)(response.status).toBe(400);
            const data = await response.json();
            (0, vitest_1.expect)(data.success).toBe(false);
            (0, vitest_1.expect)(data.error.code).toBe("VALIDATION_ERROR");
        });
    });
});
//# sourceMappingURL=auth.routes.test.js.map