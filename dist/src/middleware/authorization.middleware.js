"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireStaffCannotCreateUsers = exports.requireAdminCanOnlySetStaffRole = exports.requireAdminCanOnlyCreateStaff = exports.requireTransactionManagement = exports.requireProductManagement = exports.requireStoreManagement = exports.requireUserManagement = exports.extractQueryField = exports.extractBodyField = exports.extractParamId = exports.createResourceMiddleware = exports.createPermissionMiddleware = exports.requireTransactionType = exports.requireMinRole = exports.requireOwnerOrAdmin = exports.requireOwnerRole = exports.requireRoleHierarchy = exports.requireTransactionAccess = exports.requireProductAccess = exports.requireCategoryAccess = exports.requireStoreAccess = exports.requireUserAccess = exports.requireOwnerScope = exports.requireResourceAccess = exports.requirePermission = void 0;
const factory_1 = require("hono/factory");
const http_exception_1 = require("hono/http-exception");
const authorization_service_1 = require("../services/authorization.service");
const context_1 = require("../utils/context");
const requirePermission = (permission) => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        await authorization_service_1.AuthorizationService.enforcePermission(user, permission);
        await next();
    });
};
exports.requirePermission = requirePermission;
const requireResourceAccess = (resource, action) => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        await authorization_service_1.AuthorizationService.enforceResourceAccess(user, resource, action);
        await next();
    });
};
exports.requireResourceAccess = requireResourceAccess;
const requireOwnerScope = (ownerIdExtractor) => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        const ownerId = ownerIdExtractor(c);
        await authorization_service_1.AuthorizationService.enforceOwnerScope(user, ownerId);
        await next();
    });
};
exports.requireOwnerScope = requireOwnerScope;
const requireUserAccess = (userIdExtractor) => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        const targetUserId = userIdExtractor(c);
        await authorization_service_1.AuthorizationService.enforceUserAccess(user, targetUserId);
        await next();
    });
};
exports.requireUserAccess = requireUserAccess;
const requireStoreAccess = (storeIdExtractor) => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        const storeId = storeIdExtractor(c);
        await authorization_service_1.AuthorizationService.enforceStoreAccess(user, storeId);
        await next();
    });
};
exports.requireStoreAccess = requireStoreAccess;
const requireCategoryAccess = (categoryIdExtractor) => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        const categoryId = categoryIdExtractor(c);
        await authorization_service_1.AuthorizationService.enforceCategoryAccess(user, categoryId);
        await next();
    });
};
exports.requireCategoryAccess = requireCategoryAccess;
const requireProductAccess = (productIdExtractor) => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        const productId = productIdExtractor(c);
        await authorization_service_1.AuthorizationService.enforceProductAccess(user, productId);
        await next();
    });
};
exports.requireProductAccess = requireProductAccess;
const requireTransactionAccess = (transactionIdExtractor) => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        const transactionId = transactionIdExtractor(c);
        await authorization_service_1.AuthorizationService.enforceTransactionAccess(user, transactionId);
        await next();
    });
};
exports.requireTransactionAccess = requireTransactionAccess;
const requireRoleHierarchy = (targetRoleExtractor) => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        const targetRole = targetRoleExtractor(c);
        authorization_service_1.AuthorizationService.enforceRoleHierarchy(user, targetRole);
        await next();
    });
};
exports.requireRoleHierarchy = requireRoleHierarchy;
const requireOwnerRole = () => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        if (user.role !== "OWNER") {
            throw new http_exception_1.HTTPException(403, { message: "Only OWNER can perform this action" });
        }
        await next();
    });
};
exports.requireOwnerRole = requireOwnerRole;
const requireOwnerOrAdmin = () => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        if (user.role !== "OWNER" && user.role !== "ADMIN") {
            throw new http_exception_1.HTTPException(403, { message: "Only OWNER or ADMIN can perform this action" });
        }
        await next();
    });
};
exports.requireOwnerOrAdmin = requireOwnerOrAdmin;
const requireMinRole = (minRole) => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        const roleHierarchy = ["OWNER", "ADMIN", "STAFF", "CASHIER"];
        const userRoleLevel = roleHierarchy.indexOf(user.role);
        const minRoleLevel = roleHierarchy.indexOf(minRole);
        if (userRoleLevel === -1 || userRoleLevel > minRoleLevel) {
            throw new http_exception_1.HTTPException(403, { message: `Insufficient role. Required: ${minRole} or higher` });
        }
        await next();
    });
};
exports.requireMinRole = requireMinRole;
const requireTransactionType = (transactionTypeExtractor) => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        const transactionType = transactionTypeExtractor(c);
        authorization_service_1.AuthorizationService.enforceTransactionType(user, transactionType);
        await next();
    });
};
exports.requireTransactionType = requireTransactionType;
// Helper middleware creators for common patterns
const createPermissionMiddleware = (permission) => (0, exports.requirePermission)(permission);
exports.createPermissionMiddleware = createPermissionMiddleware;
const createResourceMiddleware = (resource, action) => (0, exports.requireResourceAccess)(resource, action);
exports.createResourceMiddleware = createResourceMiddleware;
// Extractors for common use cases
const extractParamId = (paramName) => (c) => c.req.param(paramName);
exports.extractParamId = extractParamId;
const extractBodyField = (fieldName) => (c) => c.get("validatedBody")[fieldName];
exports.extractBodyField = extractBodyField;
const extractQueryField = (fieldName) => (c) => c.req.query(fieldName);
exports.extractQueryField = extractQueryField;
// Common middleware combinations
const requireUserManagement = () => (0, exports.requirePermission)("CREATE_USER");
exports.requireUserManagement = requireUserManagement;
const requireStoreManagement = () => (0, exports.requirePermission)("CREATE_STORE");
exports.requireStoreManagement = requireStoreManagement;
const requireProductManagement = () => (0, exports.requireResourceAccess)("PRODUCT", "CREATE");
exports.requireProductManagement = requireProductManagement;
const requireTransactionManagement = () => (0, exports.requireResourceAccess)("TRANSACTION", "CREATE");
exports.requireTransactionManagement = requireTransactionManagement;
// Specific role-based middleware for common patterns
const requireAdminCanOnlyCreateStaff = () => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        const data = (0, context_1.getValidated)(c, "validatedBody");
        if (user.role === "ADMIN" && data.role !== "STAFF") {
            throw new http_exception_1.HTTPException(403, { message: "Admin can only create STAFF users" });
        }
        await next();
    });
};
exports.requireAdminCanOnlyCreateStaff = requireAdminCanOnlyCreateStaff;
const requireAdminCanOnlySetStaffRole = () => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        const data = (0, context_1.getValidated)(c, "validatedBody");
        if (data.role && user.role === "ADMIN" && data.role !== "STAFF") {
            throw new http_exception_1.HTTPException(403, { message: "Admin can only set role to STAFF" });
        }
        await next();
    });
};
exports.requireAdminCanOnlySetStaffRole = requireAdminCanOnlySetStaffRole;
const requireStaffCannotCreateUsers = () => {
    return (0, factory_1.createMiddleware)(async (c, next) => {
        const user = c.get("user");
        if (user.role === "STAFF" || user.role === "CASHIER") {
            throw new http_exception_1.HTTPException(403, { message: "STAFF and CASHIER cannot create users" });
        }
        await next();
    });
};
exports.requireStaffCannotCreateUsers = requireStaffCannotCreateUsers;
//# sourceMappingURL=authorization.middleware.js.map