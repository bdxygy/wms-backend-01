"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductWithImeisSchema = exports.productListResponseSchema = exports.productWithRelationsSchema = exports.productResponseSchema = exports.barcodeParamSchema = exports.productIdParamSchema = exports.listProductsQuerySchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
// Create product schema (without barcode - it's auto-generated)
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required").max(200, "Product name must be less than 200 characters"),
    storeId: zod_1.z.string().uuid("Invalid store ID format"),
    categoryId: zod_1.z.string().uuid("Invalid category ID format").optional(),
    sku: zod_1.z.string().min(1, "SKU is required").max(100, "SKU must be less than 100 characters"),
    isImei: zod_1.z.boolean().default(false),
    quantity: zod_1.z.number().int().min(0, "Quantity must be non-negative").default(1),
    purchasePrice: zod_1.z.number().positive("Purchase price must be positive"),
    salePrice: zod_1.z.number().positive("Sale price must be positive").optional(),
});
// Update product schema (without barcode - it's auto-generated)
exports.updateProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required").max(200, "Product name must be less than 200 characters").optional(),
    categoryId: zod_1.z.string().uuid("Invalid category ID format").optional().nullable(),
    sku: zod_1.z.string().min(1, "SKU is required").max(100, "SKU must be less than 100 characters").optional(),
    isImei: zod_1.z.boolean().optional(),
    quantity: zod_1.z.number().int().min(0, "Quantity must be non-negative").optional(),
    purchasePrice: zod_1.z.number().positive("Purchase price must be positive").optional(),
    salePrice: zod_1.z.number().positive("Sale price must be positive").optional().nullable(),
}).refine((data) => {
    // If quantity is provided and isImei is true, quantity must be 1
    if (data.isImei === true && data.quantity !== undefined && data.quantity !== 1) {
        return false;
    }
    return true;
}, {
    message: "IMEI products must have quantity of 1",
    path: ["quantity"],
});
// Query parameters for list products
exports.listProductsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(10),
    search: zod_1.z.string().optional(),
    storeId: zod_1.z.string().uuid("Invalid store ID format").optional(),
    categoryId: zod_1.z.string().uuid("Invalid category ID format").optional(),
    isImei: zod_1.z.coerce.boolean().optional(),
    minPrice: zod_1.z.coerce.number().min(0).optional(),
    maxPrice: zod_1.z.coerce.number().min(0).optional(),
});
// Product ID parameter schema
exports.productIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid product ID format"),
});
// Barcode parameter schema
exports.barcodeParamSchema = zod_1.z.object({
    barcode: zod_1.z.string().min(1, "Barcode is required").max(50, "Barcode must be less than 50 characters"),
});
// Product response schema
exports.productResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    storeId: zod_1.z.string(),
    categoryId: zod_1.z.string().nullable(),
    sku: zod_1.z.string(),
    isImei: zod_1.z.boolean(),
    barcode: zod_1.z.string(),
    quantity: zod_1.z.number(),
    purchasePrice: zod_1.z.number(),
    salePrice: zod_1.z.number().nullable(),
    createdBy: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// Product response with relations
exports.productWithRelationsSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    storeId: zod_1.z.string(),
    categoryId: zod_1.z.string().nullable(),
    sku: zod_1.z.string(),
    isImei: zod_1.z.boolean(),
    barcode: zod_1.z.string(),
    quantity: zod_1.z.number(),
    purchasePrice: zod_1.z.number(),
    salePrice: zod_1.z.number().nullable(),
    createdBy: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    store: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
    }).optional(),
    category: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
    }).optional(),
    createdByUser: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
    }).optional(),
});
// Product list response schema
exports.productListResponseSchema = zod_1.z.object({
    products: zod_1.z.array(exports.productResponseSchema),
    pagination: zod_1.z.object({
        page: zod_1.z.number(),
        limit: zod_1.z.number(),
        total: zod_1.z.number(),
        totalPages: zod_1.z.number(),
        hasNext: zod_1.z.boolean(),
        hasPrev: zod_1.z.boolean(),
    }),
});
// Update product with IMEIs schema
exports.updateProductWithImeisSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required").max(200, "Product name must be less than 200 characters").optional(),
    categoryId: zod_1.z.string().uuid("Invalid category ID format").optional().nullable(),
    sku: zod_1.z.string().min(1, "SKU is required").max(100, "SKU must be less than 100 characters").optional(),
    purchasePrice: zod_1.z.number().positive("Purchase price must be positive").optional(),
    salePrice: zod_1.z.number().positive("Sale price must be positive").optional().nullable(),
    imeis: zod_1.z.array(zod_1.z.string().min(15, "IMEI must be at least 15 characters").max(15, "IMEI must be exactly 15 characters")).min(1, "At least one IMEI is required"),
}).refine((data) => {
    // Ensure IMEIs are unique
    const uniqueImeis = new Set(data.imeis);
    return uniqueImeis.size === data.imeis.length;
}, {
    message: "All IMEIs must be unique",
    path: ["imeis"],
});
//# sourceMappingURL=product.schemas.js.map