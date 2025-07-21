import { z } from "zod";
export declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    storeId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    storeId: string;
}, {
    name: string;
    storeId: string;
}>;
export declare const updateCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
}, {
    name?: string | undefined;
}>;
export declare const listCategoriesQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    storeId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    search?: string | undefined;
    storeId?: string | undefined;
}, {
    search?: string | undefined;
    storeId?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
}>;
export declare const categoryIdParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const categoryResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    storeId: z.ZodString;
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
}, {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    storeId: string;
}>;
export declare const categoryListResponseSchema: z.ZodObject<{
    categories: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        storeId: z.ZodString;
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
    }, {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        storeId: string;
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
    categories: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        storeId: string;
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
    categories: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        storeId: string;
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
export type CreateCategoryRequest = z.infer<typeof createCategorySchema>;
export type UpdateCategoryRequest = z.infer<typeof updateCategorySchema>;
export type ListCategoriesQuery = z.infer<typeof listCategoriesQuerySchema>;
export type CategoryIdParam = z.infer<typeof categoryIdParamSchema>;
export type CategoryResponse = z.infer<typeof categoryResponseSchema>;
export type CategoryListResponse = z.infer<typeof categoryListResponseSchema>;
//# sourceMappingURL=category.schemas.d.ts.map