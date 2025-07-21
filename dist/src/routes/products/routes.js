"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const hono_1 = require("hono");
const validation_1 = require("../../utils/validation");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const authorization_middleware_1 = require("../../middleware/authorization.middleware");
const product_schemas_1 = require("../../schemas/product.schemas");
const product_handlers_1 = require("./product.handlers");
const products = new hono_1.Hono();
exports.productRoutes = products;
// Create product endpoint (OWNER or ADMIN only)
products.post("/", auth_middleware_1.authMiddleware, (0, authorization_middleware_1.requireOwnerOrAdmin)(), validation_1.ValidationMiddleware.body(product_schemas_1.createProductSchema), product_handlers_1.createProductHandler);
// List products endpoint (filtered by owner/store)
products.get("/", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.query(product_schemas_1.listProductsQuerySchema), product_handlers_1.listProductsHandler);
// Get product by barcode endpoint (must be before /:id to avoid conflicts)
// Note: No product access middleware here since we're searching by barcode
// Owner scoping will be handled in the service layer
products.get("/barcode/:barcode", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.params(product_schemas_1.barcodeParamSchema), product_handlers_1.getProductByBarcodeHandler);
// Get product by ID endpoint
products.get("/:id", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.params(product_schemas_1.productIdParamSchema), (0, authorization_middleware_1.requireProductAccess)((0, authorization_middleware_1.extractParamId)("id")), product_handlers_1.getProductHandler);
// Update product endpoint (OWNER or ADMIN only)
products.put("/:id", auth_middleware_1.authMiddleware, (0, authorization_middleware_1.requireOwnerOrAdmin)(), validation_1.ValidationMiddleware.params(product_schemas_1.productIdParamSchema), (0, authorization_middleware_1.requireProductAccess)((0, authorization_middleware_1.extractParamId)("id")), validation_1.ValidationMiddleware.body(product_schemas_1.updateProductSchema), product_handlers_1.updateProductHandler);
// Update product with IMEIs endpoint (OWNER or ADMIN only)
products.put("/:id/imeis", auth_middleware_1.authMiddleware, (0, authorization_middleware_1.requireOwnerOrAdmin)(), validation_1.ValidationMiddleware.params(product_schemas_1.productIdParamSchema), (0, authorization_middleware_1.requireProductAccess)((0, authorization_middleware_1.extractParamId)("id")), validation_1.ValidationMiddleware.body(product_schemas_1.updateProductWithImeisSchema), product_handlers_1.updateProductWithImeisHandler);
// Soft delete product endpoint (OWNER only)
products.delete("/:id", auth_middleware_1.authMiddleware, (0, authorization_middleware_1.requireOwnerOrAdmin)(), validation_1.ValidationMiddleware.params(product_schemas_1.productIdParamSchema), (0, authorization_middleware_1.requireProductAccess)((0, authorization_middleware_1.extractParamId)("id")), product_handlers_1.softDeleteProductHandler);
//# sourceMappingURL=routes.js.map