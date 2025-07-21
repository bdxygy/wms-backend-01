"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    // Database
    DATABASE_URL: zod_1.z.string().min(1, "DATABASE_URL is required"),
    DATABASE_AUTH_TOKEN: zod_1.z.string().optional(),
    // JWT
    JWT_SECRET: zod_1.z.string().min(32, "JWT_SECRET must be at least 32 characters"),
    JWT_REFRESH_SECRET: zod_1.z
        .string()
        .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
    JWT_EXPIRES_IN: zod_1.z.string().default("15m"),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().default("7d"),
    // Server
    PORT: zod_1.z.coerce.number().int().min(1000).max(65535).default(3000),
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    // CORS
    CORS_ORIGIN: zod_1.z.string().default("*"),
    // Basic Auth
    BASIC_AUTH_USERNAME: zod_1.z.string().min(1, "BASIC_AUTH_USERNAME is required"),
    BASIC_AUTH_PASSWORD: zod_1.z.string().min(1, "BASIC_AUTH_PASSWORD is required"),
    // Barcode
    BARCODE_PREFIX: zod_1.z.string().min(1, "BARCODE_PREFIX is required").default("A"),
});
exports.env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map