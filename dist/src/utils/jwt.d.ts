export interface JwtPayload {
    userId: string;
    role: string;
    ownerId?: string;
    iat?: number;
    exp?: number;
}
export declare class JwtUtils {
    private static getSecretKey;
    private static getRefreshSecretKey;
    static generateAccessToken(payload: Omit<JwtPayload, "iat" | "exp">): Promise<string>;
    static generateRefreshToken(payload: Omit<JwtPayload, "iat" | "exp">): Promise<string>;
    static verifyAccessToken(token: string): Promise<JwtPayload>;
    static verifyRefreshToken(token: string): Promise<JwtPayload>;
    static generateTokenPair(payload: Omit<JwtPayload, "iat" | "exp">): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
//# sourceMappingURL=jwt.d.ts.map