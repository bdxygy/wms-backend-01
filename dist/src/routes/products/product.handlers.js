"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteProductHandler = exports.updateProductWithImeisHandler = exports.updateProductHandler = exports.listProductsHandler = exports.getProductByBarcodeHandler = exports.getProductHandler = exports.createProductHandler = void 0;
const product_service_1 = require("../../services/product.service");
const responses_1 = require("../../utils/responses");
const context_1 = require("../../utils/context");
const createProductHandler = async (c) => {
    try {
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await product_service_1.ProductService.createProduct(validatedData, user);
        return responses_1.ResponseUtils.sendCreated(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.createProductHandler = createProductHandler;
const getProductHandler = async (c) => {
    try {
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        const result = await product_service_1.ProductService.getProductById(id);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.getProductHandler = getProductHandler;
const getProductByBarcodeHandler = async (c) => {
    try {
        const { barcode } = (0, context_1.getValidated)(c, "validatedParams");
        const user = c.get("user");
        const result = await product_service_1.ProductService.getProductByBarcode(barcode, user);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.getProductByBarcodeHandler = getProductByBarcodeHandler;
const listProductsHandler = async (c) => {
    try {
        const query = (0, context_1.getValidated)(c, "validatedQuery");
        const user = c.get("user");
        const result = await product_service_1.ProductService.listProducts(query, user);
        return responses_1.ResponseUtils.sendPaginated(c, result.products, result.pagination);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.listProductsHandler = listProductsHandler;
const updateProductHandler = async (c) => {
    try {
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await product_service_1.ProductService.updateProduct(id, validatedData, user);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.updateProductHandler = updateProductHandler;
const updateProductWithImeisHandler = async (c) => {
    try {
        console.log("updateProductWithImeisHandler called");
        console.log("Request params:", c.req.param());
        console.log("Request body:", await c.req.json());
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        console.log("Product ID:", id);
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        console.log("Validated data:", validatedData);
        const user = c.get("user");
        console.log("User:", user?.id);
        const result = await product_service_1.ProductService.updateProductWithImeis(id, validatedData, user);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        console.error("Error in updateProductWithImeisHandler:", error);
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.updateProductWithImeisHandler = updateProductWithImeisHandler;
const softDeleteProductHandler = async (c) => {
    try {
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        const user = c.get("user");
        await product_service_1.ProductService.softDeleteProduct(id, user);
        return responses_1.ResponseUtils.sendSuccess(c, { message: "Product deleted successfully" });
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.softDeleteProductHandler = softDeleteProductHandler;
//# sourceMappingURL=product.handlers.js.map