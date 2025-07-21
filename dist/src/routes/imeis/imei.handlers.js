"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByImeiHandler = exports.createProductWithImeisHandler = exports.removeImeiHandler = exports.listProductImeisHandler = exports.addImeiHandler = void 0;
const imei_service_1 = require("../../services/imei.service");
const product_service_1 = require("../../services/product.service");
const responses_1 = require("../../utils/responses");
const context_1 = require("../../utils/context");
const addImeiHandler = async (c) => {
    try {
        const { id: productId } = (0, context_1.getValidated)(c, "validatedParams");
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await imei_service_1.ImeiService.addImei(productId, validatedData, user);
        return responses_1.ResponseUtils.sendCreated(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.addImeiHandler = addImeiHandler;
const listProductImeisHandler = async (c) => {
    try {
        const { id: productId } = (0, context_1.getValidated)(c, "validatedParams");
        const query = (0, context_1.getValidated)(c, "validatedQuery");
        const user = c.get("user");
        const result = await imei_service_1.ImeiService.listProductImeis(productId, query, user);
        return responses_1.ResponseUtils.sendPaginated(c, result.imeis, result.pagination);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.listProductImeisHandler = listProductImeisHandler;
const removeImeiHandler = async (c) => {
    try {
        const { id: imeiId } = (0, context_1.getValidated)(c, "validatedParams");
        const result = await imei_service_1.ImeiService.removeImei(imeiId);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.removeImeiHandler = removeImeiHandler;
const createProductWithImeisHandler = async (c) => {
    try {
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await imei_service_1.ImeiService.createProductWithImeis(validatedData, user);
        return responses_1.ResponseUtils.sendCreated(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.createProductWithImeisHandler = createProductWithImeisHandler;
const getProductByImeiHandler = async (c) => {
    try {
        const { imei } = (0, context_1.getValidated)(c, "validatedParams");
        const user = c.get("user");
        const result = await product_service_1.ProductService.getProductByImei(imei, user);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.getProductByImeiHandler = getProductByImeiHandler;
//# sourceMappingURL=imei.handlers.js.map