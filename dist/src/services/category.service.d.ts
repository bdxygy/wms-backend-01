import type { CreateCategoryRequest, UpdateCategoryRequest, ListCategoriesQuery } from "../schemas/category.schemas";
import type { User } from "../models/users";
export declare class CategoryService {
    static createCategory(data: CreateCategoryRequest, createdBy: User): Promise<{
        id: string;
        name: string;
        storeId: string;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static getCategoryById(id: string): Promise<{
        id: string;
        name: string;
        storeId: string;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static listCategories(query: ListCategoriesQuery, requestingUser: User): Promise<{
        categories: {
            id: string;
            name: string;
            storeId: string;
            createdBy: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    static updateCategory(id: string, data: UpdateCategoryRequest, requestingUser: User): Promise<{
        id: string;
        name: string;
        storeId: string;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=category.service.d.ts.map