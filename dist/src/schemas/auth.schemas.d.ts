import { z } from "zod";
export declare const devRegisterSchema: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    username: string;
    password: string;
}, {
    name: string;
    username: string;
    password: string;
}>;
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["OWNER", "ADMIN", "STAFF", "CASHIER"]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    username: string;
    password: string;
    role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
}, {
    name: string;
    username: string;
    password: string;
    role?: "OWNER" | "ADMIN" | "STAFF" | "CASHIER" | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const refreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    refreshToken?: string | undefined;
}, {
    refreshToken?: string | undefined;
}>;
export declare const authResponseSchema: z.ZodObject<{
    user: z.ZodObject<{
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
    tokens: z.ZodObject<{
        accessToken: z.ZodString;
        refreshToken: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accessToken: string;
        refreshToken?: string | undefined;
    }, {
        accessToken: string;
        refreshToken?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    user: {
        id: string;
        ownerId: string | null;
        name: string;
        username: string;
        role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    tokens: {
        accessToken: string;
        refreshToken?: string | undefined;
    };
}, {
    user: {
        id: string;
        ownerId: string | null;
        name: string;
        username: string;
        role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    tokens: {
        accessToken: string;
        refreshToken?: string | undefined;
    };
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
export type DevRegisterRequest = z.infer<typeof devRegisterSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type RefreshTokenRequest = z.infer<typeof refreshTokenSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
//# sourceMappingURL=auth.schemas.d.ts.map