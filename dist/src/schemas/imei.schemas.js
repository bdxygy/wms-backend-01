"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductWithImeisSchema = exports.imeiListResponseSchema = exports.imeiResponseSchema = exports.listProductImeisQuerySchema = exports.imeiSearchParamSchema = exports.imeiIdParamSchema = exports.productIdParamSchema = exports.addImeiSchema = void 0;
const zod_1 = require("zod");
// Add IMEI request schema
exports.addImeiSchema = zod_1.z.object({
    imei: zod_1.z
        .string()
        .min(15, "IMEI must be at least 15 characters")
        .max(17, "IMEI must be at most 17 characters"),
});
// Product ID parameter schema
exports.productIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid product ID format"),
});
// IMEI ID parameter schema
exports.imeiIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid IMEI ID format"),
});
// IMEI search parameter schema
exports.imeiSearchParamSchema = zod_1.z.object({
    imei: zod_1.z
        .string()
        .min(15, "IMEI must be at least 15 characters")
        .max(17, "IMEI must be at most 17 characters"),
});
// List product IMEIs query schema
exports.listProductImeisQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(10),
});
// IMEI response schema
exports.imeiResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    productId: zod_1.z.string(),
    imei: zod_1.z.string(),
    createdBy: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
// IMEI list response schema
exports.imeiListResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    data: zod_1.z.array(exports.imeiResponseSchema),
    pagination: zod_1.z.object({
        page: zod_1.z.number(),
        limit: zod_1.z.number(),
        total: zod_1.z.number(),
        totalPages: zod_1.z.number(),
        hasNext: zod_1.z.boolean(),
        hasPrev: zod_1.z.boolean(),
    }),
    timestamp: zod_1.z.string(),
});
// Create product with IMEIs schema
exports.createProductWithImeisSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required"),
    categoryId: zod_1.z.string().uuid().optional(),
    sku: zod_1.z.string().min(1, "SKU is required"),
    storeId: zod_1.z.string().uuid("Store ID is required"),
    quantity: zod_1.z.number().positive("Quantity must be positive"),
    purchasePrice: zod_1.z.number().positive("Purchase price must be positive"),
    salePrice: zod_1.z.number().positive("Sale price must be positive").optional(),
    isImei: zod_1.z.boolean().default(true), // Default to true for this endpoint
    imeis: zod_1.z
        .array(zod_1.z
        .string()
        .min(15, "IMEI must be at least 15 characters")
        .max(17, "IMEI must be at most 17 characters"))
        .min(1, "At least one IMEI is required"),
});
//# sourceMappingURL=imei.schemas.js.map