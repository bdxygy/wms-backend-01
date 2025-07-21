"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const hono_1 = require("hono");
const validation_1 = require("../../utils/validation");
const basic_auth_middleware_1 = require("../../middleware/basic-auth.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const authorization_middleware_1 = require("../../middleware/authorization.middleware");
const auth_schemas_1 = require("../../schemas/auth.schemas");
const auth_handlers_1 = require("./auth.handlers");
const auth = new hono_1.Hono();
exports.authRoutes = auth;
// Developer registration endpoint (protected with basic auth)
auth.post("/dev/register", basic_auth_middleware_1.basicAuthMiddleware, validation_1.ValidationMiddleware.body(auth_schemas_1.devRegisterSchema), auth_handlers_1.devRegisterHandler);
// Regular user registration endpoint (requires authentication)
auth.post("/register", auth_middleware_1.authMiddleware, (0, authorization_middleware_1.requireStaffCannotCreateUsers)(), (0, authorization_middleware_1.requireAdminCanOnlyCreateStaff)(), validation_1.ValidationMiddleware.body(auth_schemas_1.registerSchema), auth_handlers_1.registerHandler);
// Login endpoint
auth.post("/login", validation_1.ValidationMiddleware.body(auth_schemas_1.loginSchema), auth_handlers_1.loginHandler);
// Token refresh endpoint
auth.post("/refresh", validation_1.ValidationMiddleware.body(auth_schemas_1.refreshTokenSchema), auth_handlers_1.refreshHandler);
// Logout endpoint
auth.post("/logout", auth_middleware_1.authMiddleware, auth_handlers_1.logoutHandler);
//# sourceMappingURL=routes.js.map