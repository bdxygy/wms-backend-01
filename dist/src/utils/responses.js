"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = exports.ResponseUtils = void 0;
const http_exception_1 = require("hono/http-exception");
const zod_1 = require("zod");
class ResponseUtils {
    static sendSuccess(c, data, status = 200) {
        return c.json({
            success: true,
            data,
            timestamp: new Date().toISOString(),
        }, { status: status });
    }
    static sendCreated(c, data) {
        return c.json({
            success: true,
            data,
            timestamp: new Date().toISOString(),
        }, { status: 201 });
    }
    static sendSuccessNoData(c, status = 204) {
        return c.json({
            success: true,
            data: null,
            timestamp: new Date().toISOString(),
        }, { status: status });
    }
    static sendPaginated(c, data, pagination) {
        return c.json({
            success: true,
            data,
            pagination,
            timestamp: new Date().toISOString(),
        }, { status: 200 });
    }
    static sendError(c, error) {
        const timestamp = new Date().toISOString();
        if (error instanceof http_exception_1.HTTPException) {
            return c.json({
                success: false,
                error: {
                    code: `HTTP_${error.status}`,
                    message: error.message,
                },
                timestamp,
            }, { status: error.status });
        }
        if (error instanceof zod_1.z.ZodError) {
            return c.json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: error.errors
                        .map((e) => `${e.path.join(".")}: ${e.message}`)
                        .join(", "),
                },
                timestamp,
            }, { status: 400 });
        }
        if (error instanceof Error) {
            return c.json({
                success: false,
                error: {
                    code: "INTERNAL_ERROR",
                    message: error.message,
                },
                timestamp,
            }, { status: 500 });
        }
        return c.json({
            success: false,
            error: {
                code: "UNKNOWN_ERROR",
                message: "An unknown error occurred",
            },
            timestamp,
        }, { status: 500 });
    }
    static unauthorized(c, message = "Unauthorized") {
        return c.json({
            success: false,
            error: {
                code: "UNAUTHORIZED",
                message,
            },
            timestamp: new Date().toISOString(),
        }, { status: 401 });
    }
}
exports.ResponseUtils = ResponseUtils;
exports.responses = ResponseUtils;
//# sourceMappingURL=responses.js.map