import type { User } from "../models/users";
import type { AddImeiRequest, CreateProductWithImeisRequest, ListProductImeisQuery } from "../schemas/imei.schemas";
export declare class ImeiService {
    static addImei(productId: string, data: AddImeiRequest, createdBy: User): Promise<{
        id: string;
        productId: string;
        imei: string;
        createdBy: string;
        createdAt: string;
        updatedAt: string;
    }>;
    static listProductImeis(productId: string, query: ListProductImeisQuery, requestingUser: User): Promise<{
        imeis: {
            id: string;
            productId: string;
            imei: string;
            createdBy: string;
            createdAt: string;
            updatedAt: string;
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
    static removeImei(imeiId: string): Promise<{
        message: string;
        imei: {
            id: string;
            productId: string;
            imei: string;
            createdBy: string;
        };
    }>;
    static getImeiById(imeiId: string): Promise<{
        id: string;
        productId: string;
        imei: string;
        createdBy: string;
        createdAt: string;
        updatedAt: string;
    }>;
    static createProductWithImeis(data: CreateProductWithImeisRequest, createdBy: User): Promise<{
        id: string;
        createdBy: string;
        storeId: string;
        name: string;
        categoryId: string | null;
        sku: string;
        isImei: boolean | null;
        barcode: string;
        quantity: number;
        purchasePrice: number;
        salePrice: number | null;
        createdAt: string;
        updatedAt: string;
        imeis: {
            id: string;
            imei: string;
            createdBy: string;
            createdAt: string;
            updatedAt: string;
        }[];
    }>;
}
//# sourceMappingURL=imei.service.d.ts.map