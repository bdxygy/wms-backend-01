"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryListResponseSchema = exports.categoryResponseSchema = exports.categoryIdParamSchema = exports.listCategoriesQuerySchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
// Create category schema
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Category name is required").max(100, "Category name must be less than 100 characters"),
    storeId: zod_1.z.string().uuid("Invalid store ID format"),
});
// Update category schema
exports.updateCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Category name is required").max(100, "Category name must be less than 100 characters").optional(),
});
// Query parameters for list categories
exports.listCategoriesQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(10),
    search: zod_1.z.string().optional(),
    storeId: zod_1.z.string().uuid("Invalid store ID format").optional(),
});
// Category ID parameter schema
exports.categoryIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid category ID format"),
});
// Category response schema
exports.categoryResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    storeId: zod_1.z.string(),
    createdBy: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// Category list response schema
exports.categoryListResponseSchema = zod_1.z.object({
    categories: zod_1.z.array(exports.categoryResponseSchema),
    pagination: zod_1.z.object({
        page: zod_1.z.number(),
        limit: zod_1.z.number(),
        total: zod_1.z.number(),
        totalPages: zod_1.z.number(),
        hasNext: zod_1.z.boolean(),
        hasPrev: zod_1.z.boolean(),
    }),
});
//# sourceMappingURL=category.schemas.js.map