"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransactionHandler = exports.listTransactionsHandler = exports.getTransactionHandler = exports.createTransactionHandler = void 0;
const transaction_service_1 = require("../../services/transaction.service");
const responses_1 = require("../../utils/responses");
const context_1 = require("../../utils/context");
const createTransactionHandler = async (c) => {
    try {
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await transaction_service_1.TransactionService.createTransaction(validatedData, user);
        return responses_1.ResponseUtils.sendCreated(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.createTransactionHandler = createTransactionHandler;
const getTransactionHandler = async (c) => {
    try {
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        const result = await transaction_service_1.TransactionService.getTransactionById(id);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.getTransactionHandler = getTransactionHandler;
const listTransactionsHandler = async (c) => {
    try {
        const query = (0, context_1.getValidated)(c, "validatedQuery");
        const user = c.get("user");
        const result = await transaction_service_1.TransactionService.listTransactions(query, user);
        return responses_1.ResponseUtils.sendPaginated(c, result.transactions, result.pagination);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.listTransactionsHandler = listTransactionsHandler;
const updateTransactionHandler = async (c) => {
    try {
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await transaction_service_1.TransactionService.updateTransaction(id, validatedData, user);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.updateTransactionHandler = updateTransactionHandler;
//# sourceMappingURL=transaction.handlers.js.map