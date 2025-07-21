"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeListResponseSchema = exports.storeResponseSchema = exports.storeIdParamSchema = exports.listStoresQuerySchema = exports.updateStoreSchema = exports.createStoreSchema = void 0;
const zod_1 = require("zod");
// Create store request schema
exports.createStoreSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Store name is required"),
    type: zod_1.z.string().min(1, "Store type is required"),
    addressLine1: zod_1.z.string().min(1, "Address line 1 is required"),
    addressLine2: zod_1.z.string().optional(),
    city: zod_1.z.string().min(1, "City is required"),
    province: zod_1.z.string().min(1, "Province is required"),
    postalCode: zod_1.z.string().min(1, "Postal code is required"),
    country: zod_1.z.string().min(1, "Country is required"),
    phoneNumber: zod_1.z.string().min(1, "Phone number is required"),
    email: zod_1.z.string().email("Invalid email format").optional(),
    openTime: zod_1.z.string().datetime().optional(),
    closeTime: zod_1.z.string().datetime().optional(),
    timezone: zod_1.z.string().optional(),
    mapLocation: zod_1.z.string().optional(),
});
// Update store request schema
exports.updateStoreSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Store name is required").optional(),
    type: zod_1.z.string().min(1, "Store type is required").optional(),
    addressLine1: zod_1.z.string().min(1, "Address line 1 is required").optional(),
    addressLine2: zod_1.z.string().optional(),
    city: zod_1.z.string().min(1, "City is required").optional(),
    province: zod_1.z.string().min(1, "Province is required").optional(),
    postalCode: zod_1.z.string().min(1, "Postal code is required").optional(),
    country: zod_1.z.string().min(1, "Country is required").optional(),
    phoneNumber: zod_1.z.string().min(1, "Phone number is required").optional(),
    email: zod_1.z.string().email("Invalid email format").optional(),
    isActive: zod_1.z.boolean().optional(),
    openTime: zod_1.z.string().datetime().optional(),
    closeTime: zod_1.z.string().datetime().optional(),
    timezone: zod_1.z.string().optional(),
    mapLocation: zod_1.z.string().optional(),
});
// List stores query schema
exports.listStoresQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(10),
    search: zod_1.z.string().optional(),
    type: zod_1.z.string().optional(),
    isActive: zod_1.z.coerce.boolean().optional(),
    city: zod_1.z.string().optional(),
    province: zod_1.z.string().optional(),
});
// Store ID parameter schema
exports.storeIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid store ID format"),
});
// Store response schema
exports.storeResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    ownerId: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.string(),
    addressLine1: zod_1.z.string(),
    addressLine2: zod_1.z.string().nullable(),
    city: zod_1.z.string(),
    province: zod_1.z.string(),
    postalCode: zod_1.z.string(),
    country: zod_1.z.string(),
    phoneNumber: zod_1.z.string(),
    email: zod_1.z.string().nullable(),
    isActive: zod_1.z.boolean(),
    openTime: zod_1.z.string().nullable(),
    closeTime: zod_1.z.string().nullable(),
    timezone: zod_1.z.string().nullable(),
    mapLocation: zod_1.z.string().nullable(),
    createdBy: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
// Store list response schema
exports.storeListResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    data: zod_1.z.array(exports.storeResponseSchema),
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
//# sourceMappingURL=store.schemas.js.map