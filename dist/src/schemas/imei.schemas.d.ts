import { z } from "zod";
export declare const addImeiSchema: z.ZodObject<{
    imei: z.ZodString;
}, "strip", z.ZodTypeAny, {
    imei: string;
}, {
    imei: string;
}>;
export declare const productIdParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const imeiIdParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const imeiSearchParamSchema: z.ZodObject<{
    imei: z.ZodString;
}, "strip", z.ZodTypeAny, {
    imei: string;
}, {
    imei: string;
}>;
export declare const listProductImeisQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
}, {
    limit?: number | undefined;
    page?: number | undefined;
}>;
export declare const imeiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    productId: z.ZodString;
    imei: z.ZodString;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    productId: string;
    imei: string;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    productId: string;
    imei: string;
}>;
export declare const imeiListResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productId: z.ZodString;
        imei: z.ZodString;
        createdBy: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        createdBy: string;
        productId: string;
        imei: string;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        createdBy: string;
        productId: string;
        imei: string;
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
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        createdBy: string;
        productId: string;
        imei: string;
    }[];
    timestamp: string;
    success: boolean;
    pagination: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        createdBy: string;
        productId: string;
        imei: string;
    }[];
    timestamp: string;
    success: boolean;
    pagination: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export declare const createProductWithImeisSchema: z.ZodObject<{
    name: z.ZodString;
    categoryId: z.ZodOptional<z.ZodString>;
    sku: z.ZodString;
    storeId: z.ZodString;
    quantity: z.ZodNumber;
    purchasePrice: z.ZodNumber;
    salePrice: z.ZodOptional<z.ZodNumber>;
    isImei: z.ZodDefault<z.ZodBoolean>;
    imeis: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    storeId: string;
    sku: string;
    isImei: boolean;
    quantity: number;
    purchasePrice: number;
    imeis: string[];
    categoryId?: string | undefined;
    salePrice?: number | undefined;
}, {
    name: string;
    storeId: string;
    sku: string;
    quantity: number;
    purchasePrice: number;
    imeis: string[];
    categoryId?: string | undefined;
    isImei?: boolean | undefined;
    salePrice?: number | undefined;
}>;
export type AddImeiRequest = z.infer<typeof addImeiSchema>;
export type ProductIdParam = z.infer<typeof productIdParamSchema>;
export type ImeiIdParam = z.infer<typeof imeiIdParamSchema>;
export type ImeiSearchParam = z.infer<typeof imeiSearchParamSchema>;
export type ListProductImeisQuery = z.infer<typeof listProductImeisQuerySchema>;
export type ImeiResponse = z.infer<typeof imeiResponseSchema>;
export type CreateProductWithImeisRequest = z.infer<typeof createProductWithImeisSchema>;
//# sourceMappingURL=imei.schemas.d.ts.map