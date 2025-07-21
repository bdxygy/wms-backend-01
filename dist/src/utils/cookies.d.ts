import type { Context } from "hono";
export declare class CookieUtils {
    static readonly REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
    private static getCookieSettings;
    static setRefreshTokenCookie(c: Context, refreshToken: string): void;
    static getRefreshTokenFromCookie(c: Context): string | null;
    static clearRefreshTokenCookie(c: Context): void;
}
//# sourceMappingURL=cookies.d.ts.map