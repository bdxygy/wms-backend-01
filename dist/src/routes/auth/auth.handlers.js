"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = exports.refreshHandler = exports.loginHandler = exports.registerHandler = exports.devRegisterHandler = void 0;
const auth_service_1 = require("../../services/auth.service");
const responses_1 = require("../../utils/responses");
const context_1 = require("../../utils/context");
const devRegisterHandler = async (c) => {
    try {
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const result = await auth_service_1.AuthService.devRegister(validatedData, c);
        return responses_1.ResponseUtils.sendCreated(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.devRegisterHandler = devRegisterHandler;
const registerHandler = async (c) => {
    try {
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const user = c.get("user");
        const result = await auth_service_1.AuthService.register(validatedData, user.id, c);
        return responses_1.ResponseUtils.sendCreated(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.registerHandler = registerHandler;
const loginHandler = async (c) => {
    try {
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const result = await auth_service_1.AuthService.login(validatedData, c);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.loginHandler = loginHandler;
const refreshHandler = async (c) => {
    try {
        const validatedData = (0, context_1.getValidated)(c, "validatedBody");
        const result = await auth_service_1.AuthService.refresh(validatedData, c);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.refreshHandler = refreshHandler;
const logoutHandler = async (c) => {
    try {
        const result = await auth_service_1.AuthService.logout(c);
        return responses_1.ResponseUtils.sendSuccess(c, result);
    }
    catch (error) {
        return responses_1.ResponseUtils.sendError(c, error);
    }
};
exports.logoutHandler = logoutHandler;
//# sourceMappingURL=auth.handlers.js.map