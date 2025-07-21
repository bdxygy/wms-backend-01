"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserHandler = exports.updateUserHandler = exports.listUsersHandler = exports.getUserHandler = exports.createUserHandler = void 0;
const user_service_1 = require("../../services/user.service");
const responses_1 = require("../../utils/responses");
const context_1 = require("../../utils/context");
const createUserHandler = async (c) => {
    try {
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await user_service_1.UserService.createUser(validatedData, user);
        return responses_1.ResponseUtils.sendCreated(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.createUserHandler = createUserHandler;
const getUserHandler = async (c) => {
    try {
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        const user = c.get("user");
        const result = await user_service_1.UserService.getUserById(id, user);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.getUserHandler = getUserHandler;
const listUsersHandler = async (c) => {
    try {
        const query = (0, context_1.getValidated)(c, "validatedQuery");
        const user = c.get("user");
        const result = await user_service_1.UserService.listUsers(query, user);
        return responses_1.ResponseUtils.sendPaginated(c, result.users, result.pagination);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.listUsersHandler = listUsersHandler;
const updateUserHandler = async (c) => {
    try {
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await user_service_1.UserService.updateUser(id, validatedData, user);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.updateUserHandler = updateUserHandler;
const deleteUserHandler = async (c) => {
    try {
        const { id } = (0, context_1.getValidated)(c, "validatedParams");
        const user = c.get("user");
        const result = await user_service_1.UserService.deleteUser(id, user);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.deleteUserHandler = deleteUserHandler;
//# sourceMappingURL=user.handlers.js.map