"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtils = void 0;
const jose_1 = require("jose");
const env_1 = require("../config/env");
class JwtUtils {
    // Convert JWT_SECRET to Uint8Array
    static getSecretKey() {
        return new TextEncoder().encode(env_1.env.JWT_SECRET);
    }
    // Convert JWT_REFRESH_SECRET to Uint8Array
    static getRefreshSecretKey() {
        return new TextEncoder().encode(env_1.env.JWT_REFRESH_SECRET);
    }
    static async generateAccessToken(payload) {
        const secret = this.getSecretKey();
        return await new jose_1.SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime(env_1.env.JWT_EXPIRES_IN)
            .sign(secret);
    }
    static async generateRefreshToken(payload) {
        const secret = this.getRefreshSecretKey();
        return await new jose_1.SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime(env_1.env.JWT_REFRESH_EXPIRES_IN)
            .sign(secret);
    }
    static async verifyAccessToken(token) {
        try {
            const secret = this.getSecretKey();
            const { payload } = await (0, jose_1.jwtVerify)(token, secret);
            return payload;
        }
        catch (error) {
            throw new Error("Invalid access token");
        }
    }
    static async verifyRefreshToken(token) {
        try {
            const secret = this.getRefreshSecretKey();
            const { payload } = await (0, jose_1.jwtVerify)(token, secret);
            return payload;
        }
        catch (error) {
            throw new Error("Invalid refresh token");
        }
    }
    static async generateTokenPair(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(payload),
            this.generateRefreshToken(payload),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
}
exports.JwtUtils = JwtUtils;
//# sourceMappingURL=jwt.js.map