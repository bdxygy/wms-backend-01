import { Context, Next } from "hono";
import { z } from "zod";
export declare class ValidationMiddleware {
    static body<T extends z.ZodType>(schema: T): (c: Context, next: Next) => Promise<void>;
    static query<T extends z.ZodType>(schema: T): (c: Context, next: Next) => Promise<void>;
    static params<T extends z.ZodType>(schema: T): (c: Context, next: Next) => Promise<void>;
}
//# sourceMappingURL=validation.d.ts.map