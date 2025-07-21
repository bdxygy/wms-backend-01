"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationService = void 0;
const http_exception_1 = require("hono/http-exception");
const database_1 = require("../config/database");
const users_1 = require("../models/users");
const stores_1 = require("../models/stores");
const products_1 = require("../models/products");
const transactions_1 = require("../models/transactions");
const categories_1 = require("../models/categories");
const drizzle_orm_1 = require("drizzle-orm");
class AuthorizationService {
    static rolePermissions = {
        OWNER: [
            "CREATE_USER",
            "READ_USER",
            "UPDATE_USER",
            "DELETE_USER",
            "CREATE_STORE",
            "READ_STORE",
            "UPDATE_STORE",
            "DELETE_STORE",
            "CREATE_CATEGORY",
            "READ_CATEGORY",
            "UPDATE_CATEGORY",
            "DELETE_CATEGORY",
            "CREATE_PRODUCT",
            "READ_PRODUCT",
            "UPDATE_PRODUCT",
            "DELETE_PRODUCT",
            "CREATE_TRANSACTION",
            "READ_TRANSACTION",
            "UPDATE_TRANSACTION",
            "DELETE_TRANSACTION",
        ],
        ADMIN: [
            "CREATE_USER", // Limited to STAFF role only
            "READ_USER",
            "UPDATE_USER",
            "READ_STORE",
            "CREATE_CATEGORY",
            "READ_CATEGORY",
            "UPDATE_CATEGORY",
            "CREATE_PRODUCT",
            "READ_PRODUCT",
            "UPDATE_PRODUCT",
            "CREATE_TRANSACTION",
            "READ_TRANSACTION",
            "UPDATE_TRANSACTION",
        ],
        STAFF: [
            "READ_USER",
            "READ_STORE",
            "READ_CATEGORY",
            "READ_PRODUCT",
            "UPDATE_PRODUCT", // Product checking only
            "READ_TRANSACTION",
        ],
        CASHIER: [
            "READ_USER",
            "READ_STORE",
            "READ_CATEGORY",
            "READ_PRODUCT",
            "CREATE_TRANSACTION", // SALE only
            "READ_TRANSACTION",
            "UPDATE_TRANSACTION",
        ],
    };
    static hasPermission(user, permission) {
        const userPermissions = this.rolePermissions[user.role] || [];
        return userPermissions.includes(permission);
    }
    static hasResourceAccess(user, resource, action) {
        const permission = `${action}_${resource}`;
        return this.hasPermission(user, permission);
    }
    static async checkOwnerScope(user, ownerId) {
        if (user.role === "OWNER") {
            return user.id === ownerId;
        }
        else {
            return user.ownerId === ownerId;
        }
    }
    static async checkUserAccess(requestingUser, targetUserId) {
        const targetUser = await database_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(users_1.users.id, targetUserId), (0, drizzle_orm_1.isNull)(users_1.users.deletedAt)));
        if (!targetUser[0]) {
            throw new http_exception_1.HTTPException(404, { message: "User not found" });
        }
        // Check owner scope
        if (requestingUser.role === "OWNER") {
            return targetUser[0].ownerId === requestingUser.id || targetUser[0].id === requestingUser.id;
        }
        else {
            return targetUser[0].ownerId === requestingUser.ownerId;
        }
    }
    static async checkStoreAccess(requestingUser, storeId) {
        const store = await database_1.db
            .select()
            .from(stores_1.stores)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(stores_1.stores.id, storeId), (0, drizzle_orm_1.isNull)(stores_1.stores.deletedAt)));
        if (!store[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Store not found" });
        }
        return this.checkOwnerScope(requestingUser, store[0].ownerId);
    }
    static async checkCategoryAccess(requestingUser, categoryId) {
        const category = await database_1.db
            .select({
            id: categories_1.categories.id,
            createdBy: categories_1.categories.createdBy,
            createdByOwnerId: users_1.users.ownerId,
            createdByRole: users_1.users.role,
        })
            .from(categories_1.categories)
            .innerJoin(users_1.users, (0, drizzle_orm_1.eq)(categories_1.categories.createdBy, users_1.users.id))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(categories_1.categories.id, categoryId), (0, drizzle_orm_1.isNull)(categories_1.categories.deletedAt)));
        if (!category[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Category not found" });
        }
        // Check owner scope - categories are owned by the user who created them
        if (requestingUser.role === "OWNER") {
            return category[0].createdBy === requestingUser.id ||
                category[0].createdByOwnerId === requestingUser.id;
        }
        else {
            return category[0].createdByOwnerId === requestingUser.ownerId;
        }
    }
    static async checkProductAccess(requestingUser, productId) {
        const product = await database_1.db
            .select({
            id: products_1.products.id,
            storeId: products_1.products.storeId,
            storeOwnerId: stores_1.stores.ownerId,
        })
            .from(products_1.products)
            .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.id, productId), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
        if (!product[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Product not found" });
        }
        return this.checkOwnerScope(requestingUser, product[0].storeOwnerId);
    }
    static async checkTransactionAccess(requestingUser, transactionId) {
        const transaction = await database_1.db
            .select({
            id: transactions_1.transactions.id,
            fromStoreId: transactions_1.transactions.fromStoreId,
            toStoreId: transactions_1.transactions.toStoreId,
        })
            .from(transactions_1.transactions)
            .where((0, drizzle_orm_1.eq)(transactions_1.transactions.id, transactionId));
        if (!transaction[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Transaction not found" });
        }
        // Check access through any involved store
        const storeIds = [transaction[0].fromStoreId, transaction[0].toStoreId].filter(Boolean);
        if (storeIds.length === 0) {
            return false;
        }
        const userStores = await database_1.db
            .select()
            .from(stores_1.stores)
            .where((0, drizzle_orm_1.and)(requestingUser.role === "OWNER"
            ? (0, drizzle_orm_1.eq)(stores_1.stores.ownerId, requestingUser.id)
            : (0, drizzle_orm_1.eq)(stores_1.stores.ownerId, requestingUser.ownerId), (0, drizzle_orm_1.or)(...storeIds.map(storeId => (0, drizzle_orm_1.eq)(stores_1.stores.id, storeId)))));
        return userStores.length > 0;
    }
    static validateRoleHierarchy(requestingUser, targetRole) {
        const roleHierarchy = ["OWNER", "ADMIN", "STAFF", "CASHIER"];
        const requestingRoleLevel = roleHierarchy.indexOf(requestingUser.role);
        const targetRoleLevel = roleHierarchy.indexOf(targetRole);
        // OWNER can manage all roles
        if (requestingUser.role === "OWNER") {
            return true;
        }
        // ADMIN can only create STAFF users
        if (requestingUser.role === "ADMIN") {
            return targetRole === "STAFF";
        }
        // STAFF and CASHIER cannot create users
        return false;
    }
    static validateTransactionType(user, transactionType) {
        if (user.role === "CASHIER") {
            return transactionType === "SALE";
        }
        return true; // Other roles can create any transaction type
    }
    static async enforcePermission(user, permission) {
        if (!this.hasPermission(user, permission)) {
            throw new http_exception_1.HTTPException(403, {
                message: `Insufficient permissions. Required: ${permission}`
            });
        }
    }
    static async enforceResourceAccess(user, resource, action) {
        if (!this.hasResourceAccess(user, resource, action)) {
            throw new http_exception_1.HTTPException(403, {
                message: `Access denied. Cannot ${action.toLowerCase()} ${resource.toLowerCase()}`
            });
        }
    }
    static async enforceOwnerScope(user, ownerId) {
        const hasAccess = await this.checkOwnerScope(user, ownerId);
        if (!hasAccess) {
            throw new http_exception_1.HTTPException(403, { message: "Access denied - owner scope violation" });
        }
    }
    static async enforceUserAccess(requestingUser, targetUserId) {
        const hasAccess = await this.checkUserAccess(requestingUser, targetUserId);
        if (!hasAccess) {
            throw new http_exception_1.HTTPException(403, { message: "Access denied to user" });
        }
    }
    static async enforceStoreAccess(requestingUser, storeId) {
        const hasAccess = await this.checkStoreAccess(requestingUser, storeId);
        if (!hasAccess) {
            throw new http_exception_1.HTTPException(403, { message: "Access denied to store" });
        }
    }
    static async enforceCategoryAccess(requestingUser, categoryId) {
        const hasAccess = await this.checkCategoryAccess(requestingUser, categoryId);
        if (!hasAccess) {
            throw new http_exception_1.HTTPException(403, { message: "Access denied to category" });
        }
    }
    static async enforceProductAccess(requestingUser, productId) {
        const hasAccess = await this.checkProductAccess(requestingUser, productId);
        if (!hasAccess) {
            throw new http_exception_1.HTTPException(403, { message: "Access denied to product" });
        }
    }
    static async enforceTransactionAccess(requestingUser, transactionId) {
        const hasAccess = await this.checkTransactionAccess(requestingUser, transactionId);
        if (!hasAccess) {
            throw new http_exception_1.HTTPException(403, { message: "Access denied to transaction" });
        }
    }
    static enforceRoleHierarchy(requestingUser, targetRole) {
        if (!this.validateRoleHierarchy(requestingUser, targetRole)) {
            throw new http_exception_1.HTTPException(403, {
                message: `Cannot manage users with role: ${targetRole}`
            });
        }
    }
    static enforceTransactionType(user, transactionType) {
        if (!this.validateTransactionType(user, transactionType)) {
            throw new http_exception_1.HTTPException(403, {
                message: `Role ${user.role} can only create SALE transactions`
            });
        }
    }
}
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization.service.js.map