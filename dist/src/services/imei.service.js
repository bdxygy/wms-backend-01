"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImeiService = void 0;
const crypto_1 = require("crypto");
const drizzle_orm_1 = require("drizzle-orm");
const http_exception_1 = require("hono/http-exception");
const database_1 = require("../config/database");
const categories_1 = require("../models/categories");
const product_imeis_1 = require("../models/product_imeis");
const products_1 = require("../models/products");
const stores_1 = require("../models/stores");
const barcode_1 = require("../utils/barcode");
class ImeiService {
    static async addImei(productId, data, createdBy) {
        // Verify product exists and user has access to it
        const product = await database_1.db
            .select({
            id: products_1.products.id,
            name: products_1.products.name,
            storeId: products_1.products.storeId,
            isImei: products_1.products.isImei,
            storeOwnerId: stores_1.stores.ownerId,
        })
            .from(products_1.products)
            .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
            .where((0, drizzle_orm_1.eq)(products_1.products.id, productId));
        if (!product[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Product not found" });
        }
        // Check if product supports IMEI tracking
        if (!product[0].isImei) {
            throw new http_exception_1.HTTPException(400, {
                message: "Product does not support IMEI tracking",
            });
        }
        // Authorization middleware has already checked product access
        // Check if IMEI already exists
        const existingImei = await database_1.db
            .select()
            .from(product_imeis_1.productImeis)
            .where((0, drizzle_orm_1.eq)(product_imeis_1.productImeis.imei, data.imei));
        if (existingImei.length > 0) {
            throw new http_exception_1.HTTPException(400, { message: "IMEI already exists" });
        }
        // Create IMEI record
        const imeiId = (0, crypto_1.randomUUID)();
        const imei = await database_1.db
            .insert(product_imeis_1.productImeis)
            .values({
            id: imeiId,
            productId: productId,
            imei: data.imei,
            createdBy: createdBy.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
            .returning();
        if (!imei[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to add IMEI" });
        }
        return {
            id: imei[0].id,
            productId: imei[0].productId,
            imei: imei[0].imei,
            createdBy: imei[0].createdBy,
            createdAt: imei[0].createdAt.toISOString(),
            updatedAt: imei[0].updatedAt.toISOString(),
        };
    }
    static async listProductImeis(productId, query, requestingUser) {
        // Verify product exists and user has access to it
        const product = await database_1.db
            .select({
            id: products_1.products.id,
            name: products_1.products.name,
            storeId: products_1.products.storeId,
            isImei: products_1.products.isImei,
            storeOwnerId: stores_1.stores.ownerId,
        })
            .from(products_1.products)
            .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
            .where((0, drizzle_orm_1.eq)(products_1.products.id, productId));
        if (!product[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Product not found" });
        }
        // Check if product supports IMEI tracking
        if (!product[0].isImei) {
            throw new http_exception_1.HTTPException(400, {
                message: "Product does not support IMEI tracking",
            });
        }
        // Check if user can access this product (owner scoped)
        if (requestingUser.role === "OWNER") {
            if (product[0].storeOwnerId !== requestingUser.id) {
                throw new http_exception_1.HTTPException(403, { message: "Access denied to product" });
            }
        }
        else {
            if (product[0].storeOwnerId !== requestingUser.ownerId) {
                throw new http_exception_1.HTTPException(403, { message: "Access denied to product" });
            }
        }
        // Get total count
        const totalResult = await database_1.db
            .select({ count: (0, drizzle_orm_1.count)() })
            .from(product_imeis_1.productImeis)
            .where((0, drizzle_orm_1.eq)(product_imeis_1.productImeis.productId, productId));
        const total = totalResult[0].count;
        const totalPages = Math.ceil(total / query.limit);
        const offset = (query.page - 1) * query.limit;
        // Get IMEIs with pagination
        const imeiList = await database_1.db
            .select()
            .from(product_imeis_1.productImeis)
            .where((0, drizzle_orm_1.eq)(product_imeis_1.productImeis.productId, productId))
            .limit(query.limit)
            .offset(offset)
            .orderBy(product_imeis_1.productImeis.createdAt);
        return {
            imeis: imeiList.map((imei) => ({
                id: imei.id,
                productId: imei.productId,
                imei: imei.imei,
                createdBy: imei.createdBy,
                createdAt: imei.createdAt.toISOString(),
                updatedAt: imei.updatedAt.toISOString(),
            })),
            pagination: {
                page: query.page,
                limit: query.limit,
                total,
                totalPages,
                hasNext: query.page < totalPages,
                hasPrev: query.page > 1,
            },
        };
    }
    static async removeImei(imeiId) {
        // Find IMEI to remove (authorization middleware has already checked access)
        const imei = await database_1.db
            .select({
            id: product_imeis_1.productImeis.id,
            productId: product_imeis_1.productImeis.productId,
            imei: product_imeis_1.productImeis.imei,
            createdBy: product_imeis_1.productImeis.createdBy,
        })
            .from(product_imeis_1.productImeis)
            .where((0, drizzle_orm_1.eq)(product_imeis_1.productImeis.id, imeiId));
        if (!imei[0]) {
            throw new http_exception_1.HTTPException(404, { message: "IMEI not found" });
        }
        // Remove IMEI
        await database_1.db.delete(product_imeis_1.productImeis).where((0, drizzle_orm_1.eq)(product_imeis_1.productImeis.id, imeiId));
        return {
            message: "IMEI removed successfully",
            imei: {
                id: imei[0].id,
                productId: imei[0].productId,
                imei: imei[0].imei,
                createdBy: imei[0].createdBy,
            },
        };
    }
    static async getImeiById(imeiId) {
        // Find IMEI (authorization middleware has already checked access)
        const imei = await database_1.db
            .select({
            id: product_imeis_1.productImeis.id,
            productId: product_imeis_1.productImeis.productId,
            imei: product_imeis_1.productImeis.imei,
            createdBy: product_imeis_1.productImeis.createdBy,
            createdAt: product_imeis_1.productImeis.createdAt,
            updatedAt: product_imeis_1.productImeis.updatedAt,
        })
            .from(product_imeis_1.productImeis)
            .where((0, drizzle_orm_1.eq)(product_imeis_1.productImeis.id, imeiId));
        if (!imei[0]) {
            throw new http_exception_1.HTTPException(404, { message: "IMEI not found" });
        }
        return {
            id: imei[0].id,
            productId: imei[0].productId,
            imei: imei[0].imei,
            createdBy: imei[0].createdBy,
            createdAt: imei[0].createdAt.toISOString(),
            updatedAt: imei[0].updatedAt.toISOString(),
        };
    }
    static async createProductWithImeis(data, createdBy) {
        // Verify store exists (authorization middleware has already checked access)
        const store = await database_1.db
            .select()
            .from(stores_1.stores)
            .where((0, drizzle_orm_1.eq)(stores_1.stores.id, data.storeId));
        if (!store[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Store not found" });
        }
        // Verify category exists if provided
        if (data.categoryId) {
            const category = await database_1.db
                .select()
                .from(categories_1.categories)
                .where((0, drizzle_orm_1.eq)(categories_1.categories.id, data.categoryId));
            if (!category[0]) {
                throw new http_exception_1.HTTPException(404, { message: "Category not found" });
            }
        }
        // Check if SKU already exists in the store
        const existingSku = await database_1.db
            .select()
            .from(products_1.products)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.sku, data.sku), (0, drizzle_orm_1.eq)(products_1.products.storeId, data.storeId), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
        if (existingSku.length > 0) {
            throw new http_exception_1.HTTPException(400, {
                message: "SKU already exists in this store",
            });
        }
        // Validate IMEI uniqueness
        const existingImeis = await database_1.db
            .select()
            .from(product_imeis_1.productImeis)
            .where((0, drizzle_orm_1.inArray)(product_imeis_1.productImeis.imei, data.imeis));
        if (existingImeis.length > 0) {
            const duplicateImeis = existingImeis.map((imei) => imei.imei);
            throw new http_exception_1.HTTPException(400, {
                message: `IMEIs already exist: ${duplicateImeis.join(", ")}`,
            });
        }
        // Validate quantity matches IMEI count
        if (data.quantity !== 1) {
            throw new http_exception_1.HTTPException(400, {
                message: `Product quantity must be 1 for IMEI tracking`,
            });
        }
        // Generate unique barcode
        let barcode;
        let barcodeExists = true;
        let attempts = 0;
        const maxAttempts = 10;
        while (barcodeExists && attempts < maxAttempts) {
            barcode = (0, barcode_1.generateBarcode)();
            // Check if barcode exists in owner's scope
            const existingProduct = await database_1.db
                .select()
                .from(products_1.products)
                .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.barcode, barcode), createdBy.role === "OWNER"
                ? (0, drizzle_orm_1.eq)(stores_1.stores.ownerId, createdBy.id)
                : (0, drizzle_orm_1.eq)(stores_1.stores.ownerId, createdBy.ownerId), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
            barcodeExists = existingProduct.length > 0;
            attempts++;
        }
        if (barcodeExists) {
            throw new http_exception_1.HTTPException(500, {
                message: "Failed to generate unique barcode",
            });
        }
        // Create product
        const productId = (0, crypto_1.randomUUID)();
        const product = await database_1.db
            .insert(products_1.products)
            .values({
            id: productId,
            createdBy: createdBy.id,
            storeId: data.storeId,
            name: data.name,
            categoryId: data.categoryId || null,
            sku: data.sku,
            isImei: true, // Always true for this endpoint
            barcode: barcode,
            quantity: data.quantity,
            purchasePrice: data.purchasePrice,
            salePrice: data.salePrice || null,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
            .returning();
        if (!product[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to create product" });
        }
        // Create IMEIs for the product
        const imeiRecords = data.imeis.map((imei) => ({
            id: (0, crypto_1.randomUUID)(),
            productId: productId,
            imei: imei,
            createdBy: createdBy.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        const insertedImeis = await database_1.db
            .insert(product_imeis_1.productImeis)
            .values(imeiRecords)
            .returning();
        return {
            id: product[0].id,
            createdBy: product[0].createdBy,
            storeId: product[0].storeId,
            name: product[0].name,
            categoryId: product[0].categoryId,
            sku: product[0].sku,
            isImei: product[0].isImei,
            barcode: product[0].barcode,
            quantity: product[0].quantity,
            purchasePrice: product[0].purchasePrice,
            salePrice: product[0].salePrice,
            createdAt: product[0].createdAt.toISOString(),
            updatedAt: product[0].updatedAt.toISOString(),
            imeis: insertedImeis.map((imei) => ({
                id: imei.id,
                imei: imei.imei,
                createdBy: imei.createdBy,
                createdAt: imei.createdAt.toISOString(),
                updatedAt: imei.updatedAt.toISOString(),
            })),
        };
    }
}
exports.ImeiService = ImeiService;
//# sourceMappingURL=imei.service.js.map