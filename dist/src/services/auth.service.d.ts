import type { DevRegisterRequest, RegisterRequest, LoginRequest, RefreshTokenRequest } from "../schemas/auth.schemas";
import type { Context } from "hono";
export declare class AuthService {
    static devRegister(data: DevRegisterRequest, c?: Context): Promise<{
        user: {
            id: string;
            name: string;
            username: string;
            role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
            ownerId: string | null;
            isActive: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        };
        tokens: {
            accessToken: string;
            refreshToken: string | undefined;
        };
    }>;
    static register(data: RegisterRequest, createdBy: string, c?: Context): Promise<{
        user: {
            id: string;
            name: string;
            username: string;
            role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
            ownerId: string | null;
            isActive: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        };
        tokens: {
            accessToken: string;
            refreshToken: string | undefined;
        };
    }>;
    static login(data: LoginRequest, c?: Context): Promise<{
        user: {
            id: string;
            name: string;
            username: string;
            role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
            ownerId: string | null;
            isActive: true;
            createdAt: Date;
            updatedAt: Date;
        };
        tokens: {
            accessToken: string;
            refreshToken: string | undefined;
        };
    }>;
    static refresh(data: RefreshTokenRequest, c?: Context): Promise<{
        user: {
            id: string;
            name: string;
            username: string;
            role: "OWNER" | "ADMIN" | "STAFF" | "CASHIER";
            ownerId: string | null;
            isActive: true;
            createdAt: Date;
            updatedAt: Date;
        };
        tokens: {
            accessToken: string;
            refreshToken: string | undefined;
        };
    }>;
    static logout(c?: Context): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map