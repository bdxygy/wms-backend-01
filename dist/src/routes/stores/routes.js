"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRoutes = void 0;
const hono_1 = require("hono");
const validation_1 = require("../../utils/validation");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const authorization_middleware_1 = require("../../middleware/authorization.middleware");
const store_schemas_1 = require("../../schemas/store.schemas");
const store_handlers_1 = require("./store.handlers");
const stores = new hono_1.Hono();
exports.storeRoutes = stores;
// Create store endpoint (OWNER only)
stores.post("/", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.body(store_schemas_1.createStoreSchema), (0, authorization_middleware_1.requireOwnerRole)(), store_handlers_1.createStoreHandler);
// List stores endpoint (filtered by owner)
stores.get("/", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.query(store_schemas_1.listStoresQuerySchema), store_handlers_1.listStoresHandler);
// Get store by ID endpoint
stores.get("/:id", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.params(store_schemas_1.storeIdParamSchema), (0, authorization_middleware_1.requireStoreAccess)((0, authorization_middleware_1.extractParamId)("id")), store_handlers_1.getStoreHandler);
// Update store endpoint (OWNER only)
stores.put("/:id", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.params(store_schemas_1.storeIdParamSchema), validation_1.ValidationMiddleware.body(store_schemas_1.updateStoreSchema), (0, authorization_middleware_1.requireOwnerRole)(), store_handlers_1.updateStoreHandler);
//# sourceMappingURL=routes.js.map