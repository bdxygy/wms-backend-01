import type { CreateUserRequest, UpdateUserRequest, ListUsersQuery } from "../schemas/user.schemas";
import type { User } from "../models/users";
export declare class UserService {
    static createUser(data: CreateUserRequest, createdBy: User): Promise<{
        id: string;
        name: string;
        username: string;
        role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
        ownerId: string | null;
        isActive: boolean | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static getUserById(id: string, requestingUser: User): Promise<{
        id: string;
        name: string;
        username: string;
        role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
        ownerId: string | null;
        isActive: boolean | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static listUsers(query: ListUsersQuery, requestingUser: User): Promise<{
        users: {
            id: string;
            name: string;
            username: string;
            role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
            ownerId: string | null;
            isActive: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    static updateUser(id: string, data: UpdateUserRequest, requestingUser: User): Promise<{
        id: string;
        name: string;
        username: string;
        role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
        ownerId: string | null;
        isActive: boolean | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static deleteUser(id: string, requestingUser: User): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=user.service.d.ts.map