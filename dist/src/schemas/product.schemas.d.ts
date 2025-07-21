import { z } from "zod";
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    storeId: z.ZodString;
    categoryId: z.ZodOptional<z.ZodString>;
    sku: z.ZodString;
    isImei: z.ZodDefault<z.ZodBoolean>;
    quantity: z.ZodDefault<z.ZodNumber>;
    purchasePrice: z.ZodNumber;
    salePrice: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    storeId: string;
    sku: string;
    isImei: boolean;
    quantity: number;
    purchasePrice: number;
    categoryId?: string | undefined;
    salePrice?: number | undefined;
}, {
    name: string;
    storeId: string;
    sku: string;
    purchasePrice: number;
    categoryId?: string | undefined;
    isImei?: boolean | undefined;
    quantity?: number | undefined;
    salePrice?: number | undefined;
}>;
export declare const updateProductSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    sku: z.ZodOptional<z.ZodString>;
    isImei: z.ZodOptional<z.ZodBoolean>;
    quantity: z.ZodOptional<z.ZodNumber>;
    purchasePrice: z.ZodOptional<z.ZodNumber>;
    salePrice: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    categoryId?: string | null | undefined;
    sku?: string | undefined;
    isImei?: boolean | undefined;
    quantity?: number | undefined;
    purchasePrice?: number | undefined;
    salePrice?: number | null | undefined;
}, {
    name?: string | undefined;
    categoryId?: string | null | undefined;
    sku?: string | undefined;
    isImei?: boolean | undefined;
    quantity?: number | undefined;
    purchasePrice?: number | undefined;
    salePrice?: number | null | undefined;
}>, {
    name?: string | undefined;
    categoryId?: string | null | undefined;
    sku?: string | undefined;
    isImei?: boolean | undefined;
    quantity?: number | undefined;
    purchasePrice?: number | undefined;
    salePrice?: number | null | undefined;
}, {
    name?: string | undefined;
    categoryId?: string | null | undefined;
    sku?: string | undefined;
    isImei?: boolean | undefined;
    quantity?: number | undefined;
    purchasePrice?: number | undefined;
    salePrice?: number | null | undefined;
}>;
export declare const listProductsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    storeId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    isImei: z.ZodOptional<z.ZodBoolean>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    search?: string | undefined;
    storeId?: string | undefined;
    categoryId?: string | undefined;
    isImei?: boolean | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}, {
    search?: string | undefined;
    storeId?: string | undefined;
    categoryId?: string | undefined;
    isImei?: boolean | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}>;
export declare const productIdParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const barcodeParamSchema: z.ZodObject<{
    barcode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    barcode: string;
}, {
    barcode: string;
}>;
export declare const productResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    storeId: z.ZodString;
    categoryId: z.ZodNullable<z.ZodString>;
    sku: z.ZodString;
    isImei: z.ZodBoolean;
    barcode: z.ZodString;
    quantity: z.ZodNumber;
    purchasePrice: z.ZodNumber;
    salePrice: z.ZodNullable<z.ZodNumber>;
    createdBy: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    storeId: string;
    categoryId: string | null;
    sku: string;
    isImei: boolean;
    barcode: string;
    quantity: number;
    purchasePrice: number;
    salePrice: number | null;
}, {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    storeId: string;
    categoryId: string | null;
    sku: string;
    isImei: boolean;
    barcode: string;
    quantity: number;
    purchasePrice: number;
    salePrice: number | null;
}>;
export declare const productWithRelationsSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    storeId: z.ZodString;
    categoryId: z.ZodNullable<z.ZodString>;
    sku: z.ZodString;
    isImei: z.ZodBoolean;
    barcode: z.ZodString;
    quantity: z.ZodNumber;
    purchasePrice: z.ZodNumber;
    salePrice: z.ZodNullable<z.ZodNumber>;
    createdBy: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    store: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
    }, {
        id: string;
        name: string;
    }>>;
    category: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
    }, {
        id: string;
        name: string;
    }>>;
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
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    storeId: string;
    categoryId: string | null;
    sku: string;
    isImei: boolean;
    barcode: string;
    quantity: number;
    purchasePrice: number;
    salePrice: number | null;
    createdByUser?: {
        id: string;
        name: string;
    } | undefined;
    store?: {
        id: string;
        name: string;
    } | undefined;
    category?: {
        id: string;
        name: string;
    } | undefined;
}, {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    storeId: string;
    categoryId: string | null;
    sku: string;
    isImei: boolean;
    barcode: string;
    quantity: number;
    purchasePrice: number;
    salePrice: number | null;
    createdByUser?: {
        id: string;
        name: string;
    } | undefined;
    store?: {
        id: string;
        name: string;
    } | undefined;
    category?: {
        id: string;
        name: string;
    } | undefined;
}>;
export declare const productListResponseSchema: z.ZodObject<{
    products: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        storeId: z.ZodString;
        categoryId: z.ZodNullable<z.ZodString>;
        sku: z.ZodString;
        isImei: z.ZodBoolean;
        barcode: z.ZodString;
        quantity: z.ZodNumber;
        purchasePrice: z.ZodNumber;
        salePrice: z.ZodNullable<z.ZodNumber>;
        createdBy: z.ZodString;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        storeId: string;
        categoryId: string | null;
        sku: string;
        isImei: boolean;
        barcode: string;
        quantity: number;
        purchasePrice: number;
        salePrice: number | null;
    }, {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        storeId: string;
        categoryId: string | null;
        sku: string;
        isImei: boolean;
        barcode: string;
        quantity: number;
        purchasePrice: number;
        salePrice: number | null;
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
    products: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        storeId: string;
        categoryId: string | null;
        sku: string;
        isImei: boolean;
        barcode: string;
        quantity: number;
        purchasePrice: number;
        salePrice: number | null;
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
    products: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        storeId: string;
        categoryId: string | null;
        sku: string;
        isImei: boolean;
        barcode: string;
        quantity: number;
        purchasePrice: number;
        salePrice: number | null;
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
export declare const updateProductWithImeisSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    sku: z.ZodOptional<z.ZodString>;
    purchasePrice: z.ZodOptional<z.ZodNumber>;
    salePrice: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    imeis: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    imeis: string[];
    name?: string | undefined;
    categoryId?: string | null | undefined;
    sku?: string | undefined;
    purchasePrice?: number | undefined;
    salePrice?: number | null | undefined;
}, {
    imeis: string[];
    name?: string | undefined;
    categoryId?: string | null | undefined;
    sku?: string | undefined;
    purchasePrice?: number | undefined;
    salePrice?: number | null | undefined;
}>, {
    imeis: string[];
    name?: string | undefined;
    categoryId?: string | null | undefined;
    sku?: string | undefined;
    purchasePrice?: number | undefined;
    salePrice?: number | null | undefined;
}, {
    imeis: string[];
    name?: string | undefined;
    categoryId?: string | null | undefined;
    sku?: string | undefined;
    purchasePrice?: number | undefined;
    salePrice?: number | null | undefined;
}>;
export type CreateProductRequest = z.infer<typeof createProductSchema>;
export type UpdateProductRequest = z.infer<typeof updateProductSchema>;
export type UpdateProductWithImeisRequest = z.infer<typeof updateProductWithImeisSchema>;
export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;
export type ProductIdParam = z.infer<typeof productIdParamSchema>;
export type BarcodeParam = z.infer<typeof barcodeParamSchema>;
export type ProductResponse = z.infer<typeof productResponseSchema>;
export type ProductWithRelations = z.infer<typeof productWithRelationsSchema>;
export type ProductListResponse = z.infer<typeof productListResponseSchema>;
//# sourceMappingURL=product.schemas.d.ts.map