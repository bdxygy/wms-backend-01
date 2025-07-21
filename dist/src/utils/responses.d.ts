import { Context } from "hono";
export interface BaseResponse<T = unknown> {
    success: true;
    data: T;
    timestamp: string;
}
export interface ErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
    };
    timestamp: string;
}
export interface PaginatedResponse<T = unknown> {
    success: true;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    timestamp: string;
}
export type ApiResponse<T = unknown> = BaseResponse<T> | ErrorResponse | PaginatedResponse<T>;
export declare class ResponseUtils {
    static sendSuccess<T>(c: Context, data: T, status?: number): Response;
    static sendCreated<T>(c: Context, data: T): Response;
    static sendSuccessNoData(c: Context, status?: number): Response;
    static sendPaginated<T>(c: Context, data: T[], pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }): Response;
    static sendError(c: Context, error: unknown): Response;
    static unauthorized(c: Context, message?: string): Response;
}
export declare const responses: typeof ResponseUtils;
//# sourceMappingURL=responses.d.ts.map