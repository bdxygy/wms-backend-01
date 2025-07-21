"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = require("hono/cors");
const logger_1 = require("hono/logger");
const pretty_json_1 = require("hono/pretty-json");
const secure_headers_1 = require("hono/secure-headers");
const env_1 = require("./config/env");
const node_server_1 = require("@hono/node-server");
const hono_1 = require("./http/hono");
const routes_1 = require("./routes/auth/routes");
const routes_2 = require("./routes/users/routes");
const routes_3 = require("./routes/categories/routes");
const routes_4 = require("./routes/products/routes");
const routes_5 = require("./routes/transactions/routes");
const routes_6 = require("./routes/stores/routes");
const routes_7 = require("./routes/imeis/routes");
const app = (0, hono_1.createApp)();
exports.app = app;
// Global middleware
app.use("*", (0, cors_1.cors)({
    origin: env_1.env.CORS_ORIGIN,
    credentials: true,
}));
app.use("*", (0, logger_1.logger)());
app.use("*", (0, pretty_json_1.prettyJSON)());
app.use("*", (0, secure_headers_1.secureHeaders)());
// Routes
app.route("/api/v1/auth", routes_1.authRoutes);
app.route("/api/v1/users", routes_2.userRoutes);
app.route("/api/v1/categories", routes_3.categoryRoutes);
app.route("/api/v1/products", routes_4.productRoutes);
app.route("/api/v1/transactions", routes_5.transactionRoutes);
app.route("/api/v1/stores", routes_6.storeRoutes);
app.route("/api/v1", routes_7.imeiRoutes);
// Health check endpoint
app.get("/health", (c) => {
    return c.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: env_1.env.NODE_ENV,
    });
});
// 404 handler
app.notFound((c) => {
    return c.json({ message: "Not Found", status: 404 }, 404);
});
// Error handler
app.onError((err, c) => {
    console.error(`${err}`);
    return c.json({
        message: "Internal Server Error",
        status: 500,
        ...(env_1.env.NODE_ENV === "development" && { stack: err.stack }),
    }, 500);
});
const port = env_1.env.PORT;
console.log(`🚀 Server is running on http://localhost:${port}`);
// Only start server if not in test environment
if (process.env.NODE_ENV !== "test") {
    (0, node_server_1.serve)({
        fetch: app.fetch,
        port,
        hostname: "0.0.0.0",
    });
}
//# sourceMappingURL=index.js.map