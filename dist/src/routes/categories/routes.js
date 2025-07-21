"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const hono_1 = require("hono");
const validation_1 = require("../../utils/validation");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const authorization_middleware_1 = require("../../middleware/authorization.middleware");
const category_schemas_1 = require("../../schemas/category.schemas");
const category_handlers_1 = require("./category.handlers");
const categories = new hono_1.Hono();
exports.categoryRoutes = categories;
// Create category endpoint (OWNER or ADMIN only)
categories.post("/", auth_middleware_1.authMiddleware, (0, authorization_middleware_1.requireOwnerOrAdmin)(), validation_1.ValidationMiddleware.body(category_schemas_1.createCategorySchema), category_handlers_1.createCategoryHandler);
// List categories endpoint (filtered by owner)
categories.get("/", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.query(category_schemas_1.listCategoriesQuerySchema), category_handlers_1.listCategoriesHandler);
// Get category by ID endpoint
categories.get("/:id", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.params(category_schemas_1.categoryIdParamSchema), (0, authorization_middleware_1.requireCategoryAccess)((0, authorization_middleware_1.extractParamId)("id")), category_handlers_1.getCategoryHandler);
// Update category endpoint (OWNER or ADMIN only)
categories.put("/:id", auth_middleware_1.authMiddleware, (0, authorization_middleware_1.requireOwnerOrAdmin)(), validation_1.ValidationMiddleware.params(category_schemas_1.categoryIdParamSchema), (0, authorization_middleware_1.requireCategoryAccess)((0, authorization_middleware_1.extractParamId)("id")), validation_1.ValidationMiddleware.body(category_schemas_1.updateCategorySchema), category_handlers_1.updateCategoryHandler);
//# sourceMappingURL=routes.js.map