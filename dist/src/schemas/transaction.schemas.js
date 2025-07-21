"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionListResponseSchema = exports.transactionWithRelationsSchema = exports.transactionResponseSchema = exports.transactionItemResponseSchema = exports.transactionIdParamSchema = exports.listTransactionsQuerySchema = exports.updateTransactionSchema = exports.createTransactionSchema = exports.transactionItemSchema = void 0;
const zod_1 = require("zod");
const transactions_1 = require("../models/transactions");
// Transaction item schema
exports.transactionItemSchema = zod_1.z.object({
    productId: zod_1.z.string().uuid("Invalid product ID format"),
    name: zod_1.z.string().min(1, "Product name is required"),
    price: zod_1.z.number().positive("Price must be positive"),
    quantity: zod_1.z.number().int().min(1, "Quantity must be at least 1"),
    amount: zod_1.z.number().positive("Amount must be positive"),
});
// Create transaction schema
exports.createTransactionSchema = zod_1.z.object({
    type: zod_1.z.enum(transactions_1.transactionTypes).default("SALE"),
    fromStoreId: zod_1.z.string().uuid("Invalid store ID format").optional(),
    toStoreId: zod_1.z.string().uuid("Invalid store ID format").optional(),
    photoProofUrl: zod_1.z.string().url("Invalid photo proof URL").optional(),
    transferProofUrl: zod_1.z.string().url("Invalid transfer proof URL").optional(),
    to: zod_1.z.string().optional(),
    customerPhone: zod_1.z.string().optional(),
    items: zod_1.z.array(exports.transactionItemSchema).min(1, "At least one item is required"),
}).refine((data) => {
    // For SALE transactions, at least one of fromStoreId or toStoreId should be provided
    if (data.type === "SALE") {
        return data.fromStoreId || data.toStoreId;
    }
    // For TRANSFER transactions, both fromStoreId and toStoreId are required
    if (data.type === "TRANSFER") {
        return data.fromStoreId && data.toStoreId;
    }
    return true;
}, {
    message: "Invalid store configuration for transaction type",
    path: ["fromStoreId", "toStoreId"],
});
// Update transaction schema
exports.updateTransactionSchema = zod_1.z.object({
    photoProofUrl: zod_1.z.string().url("Invalid photo proof URL").optional(),
    transferProofUrl: zod_1.z.string().url("Invalid transfer proof URL").optional(),
    to: zod_1.z.string().optional(),
    customerPhone: zod_1.z.string().optional(),
    isFinished: zod_1.z.boolean().optional(),
    items: zod_1.z.array(exports.transactionItemSchema).min(1, "At least one item is required").optional(),
});
// Query parameters for list transactions
exports.listTransactionsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(10),
    type: zod_1.z.enum(transactions_1.transactionTypes).optional(),
    storeId: zod_1.z.string().uuid("Invalid store ID format").optional(),
    isFinished: zod_1.z.coerce.boolean().optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
    minAmount: zod_1.z.coerce.number().min(0).optional(),
    maxAmount: zod_1.z.coerce.number().min(0).optional(),
});
// Transaction ID parameter schema
exports.transactionIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid transaction ID format"),
});
// Transaction item response schema
exports.transactionItemResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    productId: zod_1.z.string(),
    name: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
    amount: zod_1.z.number(),
    createdAt: zod_1.z.date(),
});
// Transaction response schema
exports.transactionResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.enum(transactions_1.transactionTypes),
    createdBy: zod_1.z.string().nullable(),
    approvedBy: zod_1.z.string().nullable(),
    fromStoreId: zod_1.z.string().nullable(),
    toStoreId: zod_1.z.string().nullable(),
    photoProofUrl: zod_1.z.string().nullable(),
    transferProofUrl: zod_1.z.string().nullable(),
    to: zod_1.z.string().nullable(),
    customerPhone: zod_1.z.string().nullable(),
    amount: zod_1.z.number().nullable(),
    isFinished: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
    items: zod_1.z.array(exports.transactionItemResponseSchema),
});
// Transaction response with relations
exports.transactionWithRelationsSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.enum(transactions_1.transactionTypes),
    createdBy: zod_1.z.string().nullable(),
    approvedBy: zod_1.z.string().nullable(),
    fromStoreId: zod_1.z.string().nullable(),
    toStoreId: zod_1.z.string().nullable(),
    photoProofUrl: zod_1.z.string().nullable(),
    transferProofUrl: zod_1.z.string().nullable(),
    to: zod_1.z.string().nullable(),
    customerPhone: zod_1.z.string().nullable(),
    amount: zod_1.z.number().nullable(),
    isFinished: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
    items: zod_1.z.array(exports.transactionItemResponseSchema),
    createdByUser: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
    }).optional(),
    approvedByUser: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
    }).optional(),
    fromStore: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
    }).optional(),
    toStore: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
    }).optional(),
});
// Transaction list response schema
exports.transactionListResponseSchema = zod_1.z.object({
    transactions: zod_1.z.array(exports.transactionResponseSchema),
    pagination: zod_1.z.object({
        page: zod_1.z.number(),
        limit: zod_1.z.number(),
        total: zod_1.z.number(),
        totalPages: zod_1.z.number(),
        hasNext: zod_1.z.boolean(),
        hasPrev: zod_1.z.boolean(),
    }),
});
//# sourceMappingURL=transaction.schemas.js.map