"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imeiRoutes = void 0;
const hono_1 = require("hono");
const validation_1 = require("../../utils/validation");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const authorization_middleware_1 = require("../../middleware/authorization.middleware");
const imei_schemas_1 = require("../../schemas/imei.schemas");
const imei_handlers_1 = require("./imei.handlers");
const imeis = new hono_1.Hono();
exports.imeiRoutes = imeis;
// Add IMEI endpoint (OWNER/ADMIN only)
imeis.post("/products/:id/imeis", auth_middleware_1.authMiddleware, (0, authorization_middleware_1.requireOwnerOrAdmin)(), validation_1.ValidationMiddleware.params(imei_schemas_1.productIdParamSchema), (0, authorization_middleware_1.requireProductAccess)((0, authorization_middleware_1.extractParamId)("id")), validation_1.ValidationMiddleware.body(imei_schemas_1.addImeiSchema), imei_handlers_1.addImeiHandler);
// List product IMEIs endpoint
imeis.get("/products/:id/imeis", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.params(imei_schemas_1.productIdParamSchema), (0, authorization_middleware_1.requireProductAccess)((0, authorization_middleware_1.extractParamId)("id")), validation_1.ValidationMiddleware.query(imei_schemas_1.listProductImeisQuerySchema), imei_handlers_1.listProductImeisHandler);
// Remove IMEI endpoint (OWNER/ADMIN only)
imeis.delete("/imeis/:id", auth_middleware_1.authMiddleware, (0, authorization_middleware_1.requireOwnerOrAdmin)(), validation_1.ValidationMiddleware.params(imei_schemas_1.imeiIdParamSchema), imei_handlers_1.removeImeiHandler);
// Create product with IMEIs endpoint (OWNER/ADMIN only)
imeis.post("/products/imeis", auth_middleware_1.authMiddleware, (0, authorization_middleware_1.requireOwnerOrAdmin)(), validation_1.ValidationMiddleware.body(imei_schemas_1.createProductWithImeisSchema), imei_handlers_1.createProductWithImeisHandler);
// Get product by IMEI endpoint
imeis.get("/products/imeis/:imei", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.params(imei_schemas_1.imeiSearchParamSchema), imei_handlers_1.getProductByImeiHandler);
//# sourceMappingURL=routes.js.map