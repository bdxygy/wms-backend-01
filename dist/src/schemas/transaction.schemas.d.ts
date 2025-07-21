import { z } from "zod";
export declare const transactionItemSchema: z.ZodObject<{
    productId: z.ZodString;
    name: z.ZodString;
    price: z.ZodNumber;
    quantity: z.ZodNumber;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    amount: number;
    quantity: number;
    productId: string;
    price: number;
}, {
    name: string;
    amount: number;
    quantity: number;
    productId: string;
    price: number;
}>;
export declare const createTransactionSchema: z.ZodEffects<z.ZodObject<{
    type: z.ZodDefault<z.ZodEnum<["SALE", "TRANSFER"]>>;
    fromStoreId: z.ZodOptional<z.ZodString>;
    toStoreId: z.ZodOptional<z.ZodString>;
    photoProofUrl: z.ZodOptional<z.ZodString>;
    transferProofUrl: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    customerPhone: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        name: z.ZodString;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }, {
        name: string;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "SALE" | "TRANSFER";
    items: {
        name: string;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }[];
    fromStoreId?: string | undefined;
    toStoreId?: string | undefined;
    photoProofUrl?: string | undefined;
    transferProofUrl?: string | undefined;
    to?: string | undefined;
    customerPhone?: string | undefined;
}, {
    items: {
        name: string;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }[];
    type?: "SALE" | "TRANSFER" | undefined;
    fromStoreId?: string | undefined;
    toStoreId?: string | undefined;
    photoProofUrl?: string | undefined;
    transferProofUrl?: string | undefined;
    to?: string | undefined;
    customerPhone?: string | undefined;
}>, {
    type: "SALE" | "TRANSFER";
    items: {
        name: string;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }[];
    fromStoreId?: string | undefined;
    toStoreId?: string | undefined;
    photoProofUrl?: string | undefined;
    transferProofUrl?: string | undefined;
    to?: string | undefined;
    customerPhone?: string | undefined;
}, {
    items: {
        name: string;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }[];
    type?: "SALE" | "TRANSFER" | undefined;
    fromStoreId?: string | undefined;
    toStoreId?: string | undefined;
    photoProofUrl?: string | undefined;
    transferProofUrl?: string | undefined;
    to?: string | undefined;
    customerPhone?: string | undefined;
}>;
export declare const updateTransactionSchema: z.ZodObject<{
    photoProofUrl: z.ZodOptional<z.ZodString>;
    transferProofUrl: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    customerPhone: z.ZodOptional<z.ZodString>;
    isFinished: z.ZodOptional<z.ZodBoolean>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        name: z.ZodString;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }, {
        name: string;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    photoProofUrl?: string | undefined;
    transferProofUrl?: string | undefined;
    to?: string | undefined;
    customerPhone?: string | undefined;
    isFinished?: boolean | undefined;
    items?: {
        name: string;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }[] | undefined;
}, {
    photoProofUrl?: string | undefined;
    transferProofUrl?: string | undefined;
    to?: string | undefined;
    customerPhone?: string | undefined;
    isFinished?: boolean | undefined;
    items?: {
        name: string;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }[] | undefined;
}>;
export declare const listTransactionsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<["SALE", "TRANSFER"]>>;
    storeId: z.ZodOptional<z.ZodString>;
    isFinished: z.ZodOptional<z.ZodBoolean>;
    startDate: z.ZodOptional<z.ZodDate>;
    endDate: z.ZodOptional<z.ZodDate>;
    minAmount: z.ZodOptional<z.ZodNumber>;
    maxAmount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    type?: "SALE" | "TRANSFER" | undefined;
    storeId?: string | undefined;
    isFinished?: boolean | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    minAmount?: number | undefined;
    maxAmount?: number | undefined;
}, {
    type?: "SALE" | "TRANSFER" | undefined;
    storeId?: string | undefined;
    isFinished?: boolean | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    minAmount?: number | undefined;
    maxAmount?: number | undefined;
}>;
export declare const transactionIdParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const transactionItemResponseSchema: z.ZodObject<{
    id: z.ZodString;
    productId: z.ZodString;
    name: z.ZodString;
    price: z.ZodNumber;
    quantity: z.ZodNumber;
    amount: z.ZodNumber;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    createdAt: Date;
    amount: number;
    quantity: number;
    productId: string;
    price: number;
}, {
    id: string;
    name: string;
    createdAt: Date;
    amount: number;
    quantity: number;
    productId: string;
    price: number;
}>;
export declare const transactionResponseSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["SALE", "TRANSFER"]>;
    createdBy: z.ZodNullable<z.ZodString>;
    approvedBy: z.ZodNullable<z.ZodString>;
    fromStoreId: z.ZodNullable<z.ZodString>;
    toStoreId: z.ZodNullable<z.ZodString>;
    photoProofUrl: z.ZodNullable<z.ZodString>;
    transferProofUrl: z.ZodNullable<z.ZodString>;
    to: z.ZodNullable<z.ZodString>;
    customerPhone: z.ZodNullable<z.ZodString>;
    amount: z.ZodNullable<z.ZodNumber>;
    isFinished: z.ZodBoolean;
    createdAt: z.ZodDate;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productId: z.ZodString;
        name: z.ZodString;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        amount: z.ZodNumber;
        createdAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        createdAt: Date;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }, {
        id: string;
        name: string;
        createdAt: Date;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "SALE" | "TRANSFER";
    id: string;
    createdAt: Date;
    createdBy: string | null;
    approvedBy: string | null;
    fromStoreId: string | null;
    toStoreId: string | null;
    photoProofUrl: string | null;
    transferProofUrl: string | null;
    to: string | null;
    customerPhone: string | null;
    amount: number | null;
    isFinished: boolean;
    items: {
        id: string;
        name: string;
        createdAt: Date;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }[];
}, {
    type: "SALE" | "TRANSFER";
    id: string;
    createdAt: Date;
    createdBy: string | null;
    approvedBy: string | null;
    fromStoreId: string | null;
    toStoreId: string | null;
    photoProofUrl: string | null;
    transferProofUrl: string | null;
    to: string | null;
    customerPhone: string | null;
    amount: number | null;
    isFinished: boolean;
    items: {
        id: string;
        name: string;
        createdAt: Date;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }[];
}>;
export declare const transactionWithRelationsSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["SALE", "TRANSFER"]>;
    createdBy: z.ZodNullable<z.ZodString>;
    approvedBy: z.ZodNullable<z.ZodString>;
    fromStoreId: z.ZodNullable<z.ZodString>;
    toStoreId: z.ZodNullable<z.ZodString>;
    photoProofUrl: z.ZodNullable<z.ZodString>;
    transferProofUrl: z.ZodNullable<z.ZodString>;
    to: z.ZodNullable<z.ZodString>;
    customerPhone: z.ZodNullable<z.ZodString>;
    amount: z.ZodNullable<z.ZodNumber>;
    isFinished: z.ZodBoolean;
    createdAt: z.ZodDate;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productId: z.ZodString;
        name: z.ZodString;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        amount: z.ZodNumber;
        createdAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        createdAt: Date;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }, {
        id: string;
        name: string;
        createdAt: Date;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }>, "many">;
    createdByUser: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
    }, {
        id: string;
        name: string;
    }>>;
    approvedByUser: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
    }, {
        id: string;
        name: string;
    }>>;
    fromStore: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
    }, {
        id: string;
        name: string;
    }>>;
    toStore: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
    }, {
        id: string;
        name: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "SALE" | "TRANSFER";
    id: string;
    createdAt: Date;
    createdBy: string | null;
    approvedBy: string | null;
    fromStoreId: string | null;
    toStoreId: string | null;
    photoProofUrl: string | null;
    transferProofUrl: string | null;
    to: string | null;
    customerPhone: string | null;
    amount: number | null;
    isFinished: boolean;
    items: {
        id: string;
        name: string;
        createdAt: Date;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }[];
    createdByUser?: {
        id: string;
        name: string;
    } | undefined;
    approvedByUser?: {
        id: string;
        name: string;
    } | undefined;
    fromStore?: {
        id: string;
        name: string;
    } | undefined;
    toStore?: {
        id: string;
        name: string;
    } | undefined;
}, {
    type: "SALE" | "TRANSFER";
    id: string;
    createdAt: Date;
    createdBy: string | null;
    approvedBy: string | null;
    fromStoreId: string | null;
    toStoreId: string | null;
    photoProofUrl: string | null;
    transferProofUrl: string | null;
    to: string | null;
    customerPhone: string | null;
    amount: number | null;
    isFinished: boolean;
    items: {
        id: string;
        name: string;
        createdAt: Date;
        amount: number;
        quantity: number;
        productId: string;
        price: number;
    }[];
    createdByUser?: {
        id: string;
        name: string;
    } | undefined;
    approvedByUser?: {
        id: string;
        name: string;
    } | undefined;
    fromStore?: {
        id: string;
        name: string;
    } | undefined;
    toStore?: {
        id: string;
        name: string;
    } | undefined;
}>;
export declare const transactionListResponseSchema: z.ZodObject<{
    transactions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["SALE", "TRANSFER"]>;
        createdBy: z.ZodNullable<z.ZodString>;
        approvedBy: z.ZodNullable<z.ZodString>;
        fromStoreId: z.ZodNullable<z.ZodString>;
        toStoreId: z.ZodNullable<z.ZodString>;
        photoProofUrl: z.ZodNullable<z.ZodString>;
        transferProofUrl: z.ZodNullable<z.ZodString>;
        to: z.ZodNullable<z.ZodString>;
        customerPhone: z.ZodNullable<z.ZodString>;
        amount: z.ZodNullable<z.ZodNumber>;
        isFinished: z.ZodBoolean;
        createdAt: z.ZodDate;
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            productId: z.ZodString;
            name: z.ZodString;
            price: z.ZodNumber;
            quantity: z.ZodNumber;
            amount: z.ZodNumber;
            createdAt: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            createdAt: Date;
            amount: number;
            quantity: number;
            productId: string;
            price: number;
        }, {
            id: string;
            name: string;
            createdAt: Date;
            amount: number;
            quantity: number;
            productId: string;
            price: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "SALE" | "TRANSFER";
        id: string;
        createdAt: Date;
        createdBy: string | null;
        approvedBy: string | null;
        fromStoreId: string | null;
        toStoreId: string | null;
        photoProofUrl: string | null;
        transferProofUrl: string | null;
        to: string | null;
        customerPhone: string | null;
        amount: number | null;
        isFinished: boolean;
        items: {
            id: string;
            name: string;
            createdAt: Date;
            amount: number;
            quantity: number;
            productId: string;
            price: number;
        }[];
    }, {
        type: "SALE" | "TRANSFER";
        id: string;
        createdAt: Date;
        createdBy: string | null;
        approvedBy: string | null;
        fromStoreId: string | null;
        toStoreId: string | null;
        photoProofUrl: string | null;
        transferProofUrl: string | null;
        to: string | null;
        customerPhone: string | null;
        amount: number | null;
        isFinished: boolean;
        items: {
            id: string;
            name: string;
            createdAt: Date;
            amount: number;
            quantity: number;
            productId: string;
            price: number;
        }[];
    }>, "many">;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }, {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    transactions: {
        type: "SALE" | "TRANSFER";
        id: string;
        createdAt: Date;
        createdBy: string | null;
        approvedBy: string | null;
        fromStoreId: string | null;
        toStoreId: string | null;
        photoProofUrl: string | null;
        transferProofUrl: string | null;
        to: string | null;
        customerPhone: string | null;
        amount: number | null;
        isFinished: boolean;
        items: {
            id: string;
            name: string;
            createdAt: Date;
            amount: number;
            quantity: number;
            productId: string;
            price: number;
        }[];
    }[];
    pagination: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}, {
    transactions: {
        type: "SALE" | "TRANSFER";
        id: string;
        createdAt: Date;
        createdBy: string | null;
        approvedBy: string | null;
        fromStoreId: string | null;
        toStoreId: string | null;
        photoProofUrl: string | null;
        transferProofUrl: string | null;
        to: string | null;
        customerPhone: string | null;
        amount: number | null;
        isFinished: boolean;
        items: {
            id: string;
            name: string;
            createdAt: Date;
            amount: number;
            quantity: number;
            productId: string;
            price: number;
        }[];
    }[];
    pagination: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export type TransactionItemRequest = z.infer<typeof transactionItemSchema>;
export type CreateTransactionRequest = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionRequest = z.infer<typeof updateTransactionSchema>;
export type ListTransactionsQuery = z.infer<typeof listTransactionsQuerySchema>;
export type TransactionIdParam = z.infer<typeof transactionIdParamSchema>;
export type TransactionItemResponse = z.infer<typeof transactionItemResponseSchema>;
export type TransactionResponse = z.infer<typeof transactionResponseSchema>;
export type TransactionWithRelations = z.infer<typeof transactionWithRelationsSchema>;
export type TransactionListResponse = z.infer<typeof transactionListResponseSchema>;
//# sourceMappingURL=transaction.schemas.d.ts.map