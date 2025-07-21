"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreHandler = exports.listStoresHandler = exports.getStoreHandler = exports.createStoreHandler = void 0;
const store_service_1 = require("../../services/store.service");
const responses_1 = require("../../utils/responses");
const context_1 = require("../../utils/context");
const createStoreHandler = async (c) => {
    try {
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await store_service_1.StoreService.createStore(validatedData, user);
        return responses_1.ResponseUtils.sendCreated(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.createStoreHandler = createStoreHandler;
const getStoreHandler = async (c) => {
    try {
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        const user = c.get("user");
        const result = await store_service_1.StoreService.getStoreById(id, user);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.getStoreHandler = getStoreHandler;
const listStoresHandler = async (c) => {
    try {
        const query = (0, context_1.getValidated)(c, "validatedQuery");
        const user = c.get("user");
        const result = await store_service_1.StoreService.listStores(query, user);
        return responses_1.ResponseUtils.sendPaginated(c, result.stores, result.pagination);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.listStoresHandler = listStoresHandler;
const updateStoreHandler = async (c) => {
    try {
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await store_service_1.StoreService.updateStore(id, validatedData, user);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.updateStoreHandler = updateStoreHandler;
//# sourceMappingURL=store.handlers.js.map