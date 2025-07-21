"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryHandler = exports.listCategoriesHandler = exports.getCategoryHandler = exports.createCategoryHandler = void 0;
const category_service_1 = require("../../services/category.service");
const responses_1 = require("../../utils/responses");
const context_1 = require("../../utils/context");
const createCategoryHandler = async (c) => {
    try {
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await category_service_1.CategoryService.createCategory(validatedData, user);
        return responses_1.ResponseUtils.sendCreated(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.createCategoryHandler = createCategoryHandler;
const getCategoryHandler = async (c) => {
    try {
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        const result = await category_service_1.CategoryService.getCategoryById(id);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.getCategoryHandler = getCategoryHandler;
const listCategoriesHandler = async (c) => {
    try {
        const query = (0, context_1.getValidated)(c, "validatedQuery");
        const user = c.get("user");
        const result = await category_service_1.CategoryService.listCategories(query, user);
        return responses_1.ResponseUtils.sendPaginated(c, result.categories, result.pagination);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.listCategoriesHandler = listCategoriesHandler;
const updateCategoryHandler = async (c) => {
    try {
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await category_service_1.CategoryService.updateCategory(id, validatedData, user);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.updateCategoryHandler = updateCategoryHandler;
//# sourceMappingURL=category.handlers.js.map