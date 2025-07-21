import type { User } from "../models/users";
export type Permission = "CREATE_USER" | "READ_USER" | "UPDATE_USER" | "DELETE_USER" | "CREATE_STORE" | "READ_STORE" | "UPDATE_STORE" | "DELETE_STORE" | "CREATE_CATEGORY" | "READ_CATEGORY" | "UPDATE_CATEGORY" | "DELETE_CATEGORY" | "CREATE_PRODUCT" | "READ_PRODUCT" | "UPDATE_PRODUCT" | "DELETE_PRODUCT" | "CREATE_TRANSACTION" | "READ_TRANSACTION" | "UPDATE_TRANSACTION" | "DELETE_TRANSACTION";
export type Resource = "USER" | "STORE" | "CATEGORY" | "PRODUCT" | "TRANSACTION";
export type Action = "CREATE" | "READ" | "UPDATE" | "DELETE";
export declare class AuthorizationService {
    private static rolePermissions;
    static hasPermission(user: User, permission: Permission): boolean;
    static hasResourceAccess(user: User, resource: Resource, action: Action): boolean;
    static checkOwnerScope(user: User, ownerId: string): Promise<boolean>;
    static checkUserAccess(requestingUser: User, targetUserId: string): Promise<boolean>;
    static checkStoreAccess(requestingUser: User, storeId: string): Promise<boolean>;
    static checkCategoryAccess(requestingUser: User, categoryId: string): Promise<boolean>;
    static checkProductAccess(requestingUser: User, productId: string): Promise<boolean>;
    static checkTransactionAccess(requestingUser: User, transactionId: string): Promise<boolean>;
    static validateRoleHierarchy(requestingUser: User, targetRole: string): boolean;
    static validateTransactionType(user: User, transactionType: string): boolean;
    static enforcePermission(user: User, permission: Permission): Promise<void>;
    static enforceResourceAccess(user: User, resource: Resource, action: Action): Promise<void>;
    static enforceOwnerScope(user: User, ownerId: string): Promise<void>;
    static enforceUserAccess(requestingUser: User, targetUserId: string): Promise<void>;
    static enforceStoreAccess(requestingUser: User, storeId: string): Promise<void>;
    static enforceCategoryAccess(requestingUser: User, categoryId: string): Promise<void>;
    static enforceProductAccess(requestingUser: User, productId: string): Promise<void>;
    static enforceTransactionAccess(requestingUser: User, transactionId: string): Promise<void>;
    static enforceRoleHierarchy(requestingUser: User, targetRole: string): void;
    static enforceTransactionType(user: User, transactionType: string): void;
}
//# sourceMappingURL=authorization.service.d.ts.map