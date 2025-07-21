import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
    role: z.ZodEnum<["OWNER", "ADMIN", "STAFF", "CASHIER"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    username: string;
    password: string;
    role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
}, {
    name: string;
    username: string;
    password: string;
    role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
}>;
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["OWNER", "ADMIN", "STAFF", "CASHIER"]>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    role?: "OWNER" | "ADMIN" | "STAFF" | "CASHIER" | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    role?: "OWNER" | "ADMIN" | "STAFF" | "CASHIER" | undefined;
    isActive?: boolean | undefined;
}>;
export declare const listUsersQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["OWNER", "ADMIN", "STAFF", "CASHIER"]>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    search?: string | undefined;
    role?: "OWNER" | "ADMIN" | "STAFF" | "CASHIER" | undefined;
    isActive?: boolean | undefined;
}, {
    search?: string | undefined;
    role?: "OWNER" | "ADMIN" | "STAFF" | "CASHIER" | undefined;
    isActive?: boolean | undefined;
    limit?: number | undefined;
    page?: number | undefined;
}>;
export declare const userIdParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const userResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    username: z.ZodString;
    role: z.ZodEnum<["OWNER", "ADMIN", "STAFF", "CASHIER"]>;
    ownerId: z.ZodNullable<z.ZodString>;
    isActive: z.ZodBoolean;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    ownerId: string | null;
    name: string;
    username: string;
    role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}, {
    id: string;
    ownerId: string | null;
    name: string;
    username: string;
    role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const userListResponseSchema: z.ZodObject<{
    users: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        username: z.ZodString;
        role: z.ZodEnum<["OWNER", "ADMIN", "STAFF", "CASHIER"]>;
        ownerId: z.ZodNullable<z.ZodString>;
        isActive: z.ZodBoolean;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        ownerId: string | null;
        name: string;
        username: string;
        role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, {
        id: string;
        ownerId: string | null;
        name: string;
        username: string;
        role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>, "many">;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }, {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    users: {
        id: string;
        ownerId: string | null;
        name: string;
        username: string;
        role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[];
    pagination: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}, {
    users: {
        id: string;
        ownerId: string | null;
        name: string;
        username: string;
        role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[];
    pagination: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export type CreateUserRequest = z.infer<typeof createUserSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserSchema>;
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;
export type UserIdParam = z.infer<typeof userIdParamSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserListResponse = z.infer<typeof userListResponseSchema>;
//# sourceMappingURL=user.schemas.d.ts.map