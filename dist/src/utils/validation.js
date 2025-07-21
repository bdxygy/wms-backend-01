"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const zod_1 = require("zod");
const http_exception_1 = require("hono/http-exception");
class ValidationMiddleware {
    static body(schema) {
        return async (c, next) => {
            try {
                const body = await c.req.json();
                const validatedData = schema.parse(body);
                c.set("validatedBody", validatedData);
                await next();
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    throw new http_exception_1.HTTPException(400, {
                        message: error.errors
                            .map((e) => `${e.path.join(".")}: ${e.message}`)
                            .join(", "),
                    });
                }
                throw error;
            }
        };
    }
    static query(schema) {
        return async (c, next) => {
            try {
                const query = c.req.query();
                const validatedData = schema.parse(query);
                c.set("validatedQuery", validatedData);
                await next();
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    throw new http_exception_1.HTTPException(400, {
                        message: error.errors
                            .map((e) => `${e.path.join(".")}: ${e.message}`)
                            .join(", "),
                    });
                }
                throw error;
            }
        };
    }
    static params(schema) {
        return async (c, next) => {
            try {
                const params = c.req.param();
                const validatedData = schema.parse(params);
                c.set("validatedParams", validatedData);
                await next();
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    throw new http_exception_1.HTTPException(400, {
                        message: error.errors
                            .map((e) => `${e.path.join(".")}: ${e.message}`)
                            .join(", "),
                    });
                }
                throw error;
            }
        };
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=validation.js.map