"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const hono_1 = require("hono");
const validation_1 = require("../../utils/validation");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const authorization_middleware_1 = require("../../middleware/authorization.middleware");
const user_schemas_1 = require("../../schemas/user.schemas");
const user_handlers_1 = require("./user.handlers");
const users = new hono_1.Hono();
exports.userRoutes = users;
// Create user endpoint (OWNER or ADMIN only)
users.post("/", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.body(user_schemas_1.createUserSchema), (0, authorization_middleware_1.requireStaffCannotCreateUsers)(), (0, authorization_middleware_1.requireAdminCanOnlyCreateStaff)(), user_handlers_1.createUserHandler);
// List users endpoint (filtered by owner)
users.get("/", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.query(user_schemas_1.listUsersQuerySchema), user_handlers_1.listUsersHandler);
// Get user by ID endpoint
users.get("/:id", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.params(user_schemas_1.userIdParamSchema), (0, authorization_middleware_1.requireUserAccess)((0, authorization_middleware_1.extractParamId)("id")), user_handlers_1.getUserHandler);
// Update user endpoint
users.put("/:id", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.params(user_schemas_1.userIdParamSchema), validation_1.ValidationMiddleware.body(user_schemas_1.updateUserSchema), (0, authorization_middleware_1.requireUserAccess)((0, authorization_middleware_1.extractParamId)("id")), (0, authorization_middleware_1.requireAdminCanOnlySetStaffRole)(), user_handlers_1.updateUserHandler);
// Delete user endpoint (OWNER only)
users.delete("/:id", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.params(user_schemas_1.userIdParamSchema), (0, authorization_middleware_1.requireOwnerRole)(), user_handlers_1.deleteUserHandler);
//# sourceMappingURL=routes.js.map