"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const hono_1 = require("hono");
const validation_1 = require("../../utils/validation");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const authorization_middleware_1 = require("../../middleware/authorization.middleware");
const transaction_schemas_1 = require("../../schemas/transaction.schemas");
const transaction_handlers_1 = require("./transaction.handlers");
const transactions = new hono_1.Hono();
exports.transactionRoutes = transactions;
// Create transaction endpoint (OWNER or ADMIN only)
transactions.post("/", auth_middleware_1.authMiddleware, (0, authorization_middleware_1.requireOwnerOrAdmin)(), validation_1.ValidationMiddleware.body(transaction_schemas_1.createTransactionSchema), transaction_handlers_1.createTransactionHandler);
// List transactions endpoint (filtered by owner)
transactions.get("/", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.query(transaction_schemas_1.listTransactionsQuerySchema), transaction_handlers_1.listTransactionsHandler);
// Get transaction by ID endpoint
transactions.get("/:id", auth_middleware_1.authMiddleware, validation_1.ValidationMiddleware.params(transaction_schemas_1.transactionIdParamSchema), (0, authorization_middleware_1.requireTransactionAccess)((0, authorization_middleware_1.extractParamId)("id")), transaction_handlers_1.getTransactionHandler);
// Update transaction endpoint (OWNER or ADMIN only)
transactions.put("/:id", auth_middleware_1.authMiddleware, (0, authorization_middleware_1.requireOwnerOrAdmin)(), validation_1.ValidationMiddleware.params(transaction_schemas_1.transactionIdParamSchema), (0, authorization_middleware_1.requireTransactionAccess)((0, authorization_middleware_1.extractParamId)("id")), validation_1.ValidationMiddleware.body(transaction_schemas_1.updateTransactionSchema), transaction_handlers_1.updateTransactionHandler);
//# sourceMappingURL=routes.js.map