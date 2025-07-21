import type { CreateProductRequest, UpdateProductRequest, UpdateProductWithImeisRequest, ListProductsQuery } from "../schemas/product.schemas";
import type { User } from "../models/users";
export declare class ProductService {
    static createProduct(data: CreateProductRequest, createdBy: User): Promise<{
        id: string;
        name: string;
        storeId: string;
        categoryId: string | null;
        sku: string;
        isImei: boolean | null;
        barcode: string;
        quantity: number;
        purchasePrice: number;
        salePrice: number | null;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static getProductById(id: string): Promise<{
        id: string;
        name: string;
        storeId: string;
        categoryId: string | null;
        sku: string;
        isImei: boolean | null;
        barcode: string;
        quantity: number;
        purchasePrice: number;
        salePrice: number | null;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static getProductByBarcode(barcode: string, requestingUser: User): Promise<{
        id: string;
        name: string;
        storeId: string;
        categoryId: string | null;
        sku: string;
        isImei: boolean | null;
        barcode: string;
        quantity: number;
        purchasePrice: number;
        salePrice: number | null;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static listProducts(query: ListProductsQuery, requestingUser: User): Promise<{
        products: {
            id: string;
            name: string;
            storeId: string;
            categoryId: string | null;
            sku: string;
            isImei: boolean | null;
            barcode: string;
            quantity: number;
            purchasePrice: number;
            salePrice: number | null;
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
    static updateProduct(id: string, data: UpdateProductRequest, requestingUser: User): Promise<{
        id: string;
        name: string;
        storeId: string;
        categoryId: string | null;
        sku: string;
        isImei: boolean | null;
        barcode: string;
        quantity: number;
        purchasePrice: number;
        salePrice: number | null;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static getProductByImei(imei: string, requestingUser: User): Promise<{
        id: string;
        name: string;
        storeId: string;
        categoryId: string | null;
        sku: string;
        isImei: boolean | null;
        barcode: string;
        quantity: number;
        purchasePrice: number;
        salePrice: number | null;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        imeis: string[];
    }>;
    static updateProductWithImeis(id: string, data: UpdateProductWithImeisRequest, requestingUser: User): Promise<{
        id: string;
        name: string;
        storeId: string;
        categoryId: string | null;
        sku: string;
        isImei: boolean | null;
        barcode: string;
        quantity: number;
        purchasePrice: number;
        salePrice: number | null;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        imeis: {
            id: string;
            imei: string;
            createdBy: string;
            createdAt: string;
            updatedAt: string;
        }[];
    }>;
    static softDeleteProduct(id: string, _requestingUser: User): Promise<{
        id: string;
        name: string;
        deletedAt: Date | null;
    }>;
}
//# sourceMappingURL=product.service.d.ts.map