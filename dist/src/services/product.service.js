"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const crypto_1 = require("crypto");
const database_1 = require("../config/database");
const products_1 = require("../models/products");
const stores_1 = require("../models/stores");
const categories_1 = require("../models/categories");
const product_imeis_1 = require("../models/product_imeis");
const drizzle_orm_1 = require("drizzle-orm");
const http_exception_1 = require("hono/http-exception");
const barcode_1 = require("@/utils/barcode");
class ProductService {
    static async createProduct(data, createdBy) {
        // Verify store exists (authorization middleware has already checked role and access)
        const store = await database_1.db
            .select()
            .from(stores_1.stores)
            .where((0, drizzle_orm_1.eq)(stores_1.stores.id, data.storeId));
        if (!store[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Store not found" });
        }
        // Verify category exists and belongs to the same store (if provided)
        if (data.categoryId) {
            const category = await database_1.db
                .select()
                .from(categories_1.categories)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(categories_1.categories.id, data.categoryId), (0, drizzle_orm_1.eq)(categories_1.categories.storeId, data.storeId), (0, drizzle_orm_1.isNull)(categories_1.categories.deletedAt)));
            if (!category[0]) {
                throw new http_exception_1.HTTPException(404, {
                    message: "Category not found or does not belong to this store",
                });
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
        // Generate unique barcode
        let barcode;
        let barcodeExists = true;
        let attempts = 0;
        while (barcodeExists && attempts < 10) {
            barcode = (0, barcode_1.generateBarcode)();
            const existingBarcode = await database_1.db
                .select()
                .from(products_1.products)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.barcode, barcode), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
            barcodeExists = existingBarcode.length > 0;
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
            name: data.name,
            storeId: data.storeId,
            categoryId: data.categoryId || null,
            sku: data.sku,
            isImei: data.isImei,
            barcode: barcode,
            quantity: data.quantity,
            purchasePrice: data.purchasePrice,
            salePrice: data.salePrice || null,
            createdBy: createdBy.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
            .returning();
        if (!product[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to create product" });
        }
        return {
            id: product[0].id,
            name: product[0].name,
            storeId: product[0].storeId,
            categoryId: product[0].categoryId,
            sku: product[0].sku,
            isImei: product[0].isImei,
            barcode: product[0].barcode,
            quantity: product[0].quantity,
            purchasePrice: product[0].purchasePrice,
            salePrice: product[0].salePrice,
            createdBy: product[0].createdBy,
            createdAt: product[0].createdAt,
            updatedAt: product[0].updatedAt,
        };
    }
    static async getProductById(id) {
        const product = await database_1.db
            .select({
            id: products_1.products.id,
            name: products_1.products.name,
            storeId: products_1.products.storeId,
            categoryId: products_1.products.categoryId,
            sku: products_1.products.sku,
            isImei: products_1.products.isImei,
            barcode: products_1.products.barcode,
            quantity: products_1.products.quantity,
            purchasePrice: products_1.products.purchasePrice,
            salePrice: products_1.products.salePrice,
            createdBy: products_1.products.createdBy,
            createdAt: products_1.products.createdAt,
            updatedAt: products_1.products.updatedAt,
        })
            .from(products_1.products)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.id, id), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
        if (!product[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Product not found" });
        }
        return {
            id: product[0].id,
            name: product[0].name,
            storeId: product[0].storeId,
            categoryId: product[0].categoryId,
            sku: product[0].sku,
            isImei: product[0].isImei,
            barcode: product[0].barcode,
            quantity: product[0].quantity,
            purchasePrice: product[0].purchasePrice,
            salePrice: product[0].salePrice,
            createdBy: product[0].createdBy,
            createdAt: product[0].createdAt,
            updatedAt: product[0].updatedAt,
        };
    }
    static async getProductByBarcode(barcode, requestingUser) {
        const product = await database_1.db
            .select({
            id: products_1.products.id,
            name: products_1.products.name,
            storeId: products_1.products.storeId,
            categoryId: products_1.products.categoryId,
            sku: products_1.products.sku,
            isImei: products_1.products.isImei,
            barcode: products_1.products.barcode,
            quantity: products_1.products.quantity,
            purchasePrice: products_1.products.purchasePrice,
            salePrice: products_1.products.salePrice,
            createdBy: products_1.products.createdBy,
            createdAt: products_1.products.createdAt,
            updatedAt: products_1.products.updatedAt,
            storeOwnerId: stores_1.stores.ownerId,
        })
            .from(products_1.products)
            .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.barcode, barcode), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
        if (!product[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Product not found" });
        }
        // Check if user can access this product (owner scoped)
        if (requestingUser.role === "OWNER") {
            if (product[0].storeOwnerId !== requestingUser.id) {
                throw new http_exception_1.HTTPException(403, { message: "Access denied" });
            }
        }
        else {
            // For non-OWNER users, check if they belong to the same owner
            if (product[0].storeOwnerId !== requestingUser.ownerId) {
                throw new http_exception_1.HTTPException(403, { message: "Access denied" });
            }
        }
        return {
            id: product[0].id,
            name: product[0].name,
            storeId: product[0].storeId,
            categoryId: product[0].categoryId,
            sku: product[0].sku,
            isImei: product[0].isImei,
            barcode: product[0].barcode,
            quantity: product[0].quantity,
            purchasePrice: product[0].purchasePrice,
            salePrice: product[0].salePrice,
            createdBy: product[0].createdBy,
            createdAt: product[0].createdAt,
            updatedAt: product[0].updatedAt,
        };
    }
    static async listProducts(query, requestingUser) {
        // Build where conditions
        const conditions = [];
        // Owner scoping - only show products from stores owned by the user's owner
        if (requestingUser.role === "OWNER") {
            conditions.push((0, drizzle_orm_1.eq)(stores_1.stores.ownerId, requestingUser.id));
        }
        else {
            conditions.push((0, drizzle_orm_1.eq)(stores_1.stores.ownerId, requestingUser.ownerId));
        }
        // Store filter
        if (query.storeId) {
            conditions.push((0, drizzle_orm_1.eq)(products_1.products.storeId, query.storeId));
        }
        // Category filter
        if (query.categoryId) {
            conditions.push((0, drizzle_orm_1.eq)(products_1.products.categoryId, query.categoryId));
        }
        // IMEI filter
        if (query.isImei !== undefined) {
            conditions.push((0, drizzle_orm_1.eq)(products_1.products.isImei, query.isImei));
        }
        // Search filter
        if (query.search) {
            conditions.push((0, drizzle_orm_1.like)(products_1.products.name, `%${query.search}%`));
        }
        // Price filters
        if (query.minPrice !== undefined) {
            conditions.push((0, drizzle_orm_1.gte)(products_1.products.purchasePrice, query.minPrice));
        }
        if (query.maxPrice !== undefined) {
            conditions.push((0, drizzle_orm_1.lte)(products_1.products.purchasePrice, query.maxPrice));
        }
        // Exclude deleted products
        conditions.push((0, drizzle_orm_1.isNull)(products_1.products.deletedAt));
        const whereClause = (0, drizzle_orm_1.and)(...conditions);
        // Get total count
        const totalResult = await database_1.db
            .select({ count: (0, drizzle_orm_1.count)() })
            .from(products_1.products)
            .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
            .where(whereClause);
        const total = totalResult[0].count;
        const totalPages = Math.ceil(total / query.limit);
        const offset = (query.page - 1) * query.limit;
        // Get products with pagination
        const productList = await database_1.db
            .select({
            id: products_1.products.id,
            name: products_1.products.name,
            storeId: products_1.products.storeId,
            categoryId: products_1.products.categoryId,
            sku: products_1.products.sku,
            isImei: products_1.products.isImei,
            barcode: products_1.products.barcode,
            quantity: products_1.products.quantity,
            purchasePrice: products_1.products.purchasePrice,
            salePrice: products_1.products.salePrice,
            createdBy: products_1.products.createdBy,
            createdAt: products_1.products.createdAt,
            updatedAt: products_1.products.updatedAt,
        })
            .from(products_1.products)
            .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
            .where(whereClause)
            .limit(query.limit)
            .offset(offset)
            .orderBy(products_1.products.createdAt);
        return {
            products: productList,
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
    static async updateProduct(id, data, requestingUser) {
        // Find product to update (authorization middleware has already checked access)
        const existingProduct = await database_1.db
            .select({
            id: products_1.products.id,
            name: products_1.products.name,
            storeId: products_1.products.storeId,
            categoryId: products_1.products.categoryId,
            sku: products_1.products.sku,
            isImei: products_1.products.isImei,
            quantity: products_1.products.quantity,
            createdBy: products_1.products.createdBy,
            storeOwnerId: stores_1.stores.ownerId,
        })
            .from(products_1.products)
            .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.id, id), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
        if (!existingProduct[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Product not found" });
        }
        // Verify category exists and belongs to the same store (if provided)
        if (data.categoryId) {
            const category = await database_1.db
                .select()
                .from(categories_1.categories)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(categories_1.categories.id, data.categoryId), (0, drizzle_orm_1.eq)(categories_1.categories.storeId, existingProduct[0].storeId), (0, drizzle_orm_1.isNull)(categories_1.categories.deletedAt)));
            if (!category[0]) {
                throw new http_exception_1.HTTPException(404, {
                    message: "Category not found or does not belong to this store",
                });
            }
        }
        // Check if SKU already exists in the store (if SKU is being updated)
        if (data.sku && data.sku !== existingProduct[0].sku) {
            const duplicateSku = await database_1.db
                .select()
                .from(products_1.products)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.sku, data.sku), (0, drizzle_orm_1.eq)(products_1.products.storeId, existingProduct[0].storeId), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
            if (duplicateSku.length > 0) {
                throw new http_exception_1.HTTPException(400, {
                    message: "SKU already exists in this store",
                });
            }
        }
        // Business rule validation for IMEI products
        const finalIsImei = data.isImei !== undefined ? data.isImei : existingProduct[0].isImei;
        const finalQuantity = data.quantity !== undefined ? data.quantity : existingProduct[0].quantity;
        // If product is being set to IMEI tracking, validate quantity rules
        if (finalIsImei && finalQuantity !== 1) {
            throw new http_exception_1.HTTPException(400, {
                message: "IMEI products must have quantity of 1",
            });
        }
        // If enabling IMEI tracking on existing product, force quantity to 1
        if (data.isImei === true && !existingProduct[0].isImei) {
            // Force quantity to 1 when enabling IMEI tracking
            data.quantity = 1;
        }
        // Prepare update data
        const updateData = {
            updatedAt: new Date(),
        };
        if (data.name)
            updateData.name = data.name;
        if (data.categoryId !== undefined)
            updateData.categoryId = data.categoryId;
        if (data.sku)
            updateData.sku = data.sku;
        if (data.isImei !== undefined)
            updateData.isImei = data.isImei;
        if (data.quantity !== undefined)
            updateData.quantity = data.quantity;
        if (data.purchasePrice !== undefined)
            updateData.purchasePrice = data.purchasePrice;
        if (data.salePrice !== undefined)
            updateData.salePrice = data.salePrice;
        // Update product
        const updatedProduct = await database_1.db
            .update(products_1.products)
            .set(updateData)
            .where((0, drizzle_orm_1.eq)(products_1.products.id, id))
            .returning();
        if (!updatedProduct[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to update product" });
        }
        return {
            id: updatedProduct[0].id,
            name: updatedProduct[0].name,
            storeId: updatedProduct[0].storeId,
            categoryId: updatedProduct[0].categoryId,
            sku: updatedProduct[0].sku,
            isImei: updatedProduct[0].isImei,
            barcode: updatedProduct[0].barcode,
            quantity: updatedProduct[0].quantity,
            purchasePrice: updatedProduct[0].purchasePrice,
            salePrice: updatedProduct[0].salePrice,
            createdBy: updatedProduct[0].createdBy,
            createdAt: updatedProduct[0].createdAt,
            updatedAt: updatedProduct[0].updatedAt,
        };
    }
    static async getProductByImei(imei, requestingUser) {
        // First find the product by IMEI
        const productWithImei = await database_1.db
            .select({
            id: products_1.products.id,
            name: products_1.products.name,
            storeId: products_1.products.storeId,
            categoryId: products_1.products.categoryId,
            sku: products_1.products.sku,
            isImei: products_1.products.isImei,
            barcode: products_1.products.barcode,
            quantity: products_1.products.quantity,
            purchasePrice: products_1.products.purchasePrice,
            salePrice: products_1.products.salePrice,
            createdBy: products_1.products.createdBy,
            createdAt: products_1.products.createdAt,
            updatedAt: products_1.products.updatedAt,
            storeOwnerId: stores_1.stores.ownerId,
        })
            .from(product_imeis_1.productImeis)
            .innerJoin(products_1.products, (0, drizzle_orm_1.eq)(product_imeis_1.productImeis.productId, products_1.products.id))
            .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(product_imeis_1.productImeis.imei, imei), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
        if (!productWithImei[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Product with IMEI not found" });
        }
        const product = productWithImei[0];
        // Check if user can access this product (owner scoped)
        if (requestingUser.role === "OWNER") {
            if (product.storeOwnerId !== requestingUser.id) {
                throw new http_exception_1.HTTPException(403, { message: "Access denied" });
            }
        }
        else {
            // For non-OWNER users, check if they belong to the same owner
            if (product.storeOwnerId !== requestingUser.ownerId) {
                throw new http_exception_1.HTTPException(403, { message: "Access denied" });
            }
        }
        // Get all IMEIs for this product
        const allImeis = await database_1.db
            .select({
            imei: product_imeis_1.productImeis.imei,
        })
            .from(product_imeis_1.productImeis)
            .where((0, drizzle_orm_1.eq)(product_imeis_1.productImeis.productId, product.id));
        return {
            id: product.id,
            name: product.name,
            storeId: product.storeId,
            categoryId: product.categoryId,
            sku: product.sku,
            isImei: product.isImei,
            barcode: product.barcode,
            quantity: product.quantity,
            purchasePrice: product.purchasePrice,
            salePrice: product.salePrice,
            createdBy: product.createdBy,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            imeis: allImeis.map((item) => item.imei),
        };
    }
    static async updateProductWithImeis(id, data, requestingUser) {
        // Find product to update (authorization middleware has already checked access)
        let [existingProduct] = await database_1.db
            .select({
            id: products_1.products.id,
            name: products_1.products.name,
            storeId: products_1.products.storeId,
            categoryId: products_1.products.categoryId,
            sku: products_1.products.sku,
            isImei: products_1.products.isImei,
            quantity: products_1.products.quantity,
            createdBy: products_1.products.createdBy,
            storeOwnerId: stores_1.stores.ownerId,
        })
            .from(products_1.products)
            .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.id, id), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
        if (!existingProduct) {
            throw new http_exception_1.HTTPException(404, { message: "Product not found" });
        }
        const { imeis, ...newValue } = data;
        if (imeis.length) {
            existingProduct.isImei = true;
        }
        if (!existingProduct) {
            throw new http_exception_1.HTTPException(404, { message: "Product not found" });
        }
        // Check if product supports IMEI tracking
        if (!existingProduct.isImei) {
            throw new http_exception_1.HTTPException(400, {
                message: "Product does not support IMEI tracking",
            });
        }
        // Verify category exists and belongs to the same store (if provided)
        if (data.categoryId) {
            const category = await database_1.db
                .select()
                .from(categories_1.categories)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(categories_1.categories.id, data.categoryId), (0, drizzle_orm_1.eq)(categories_1.categories.storeId, existingProduct.storeId), (0, drizzle_orm_1.isNull)(categories_1.categories.deletedAt)));
            if (!category[0]) {
                throw new http_exception_1.HTTPException(404, {
                    message: "Category not found or does not belong to this store",
                });
            }
        }
        // Check if SKU already exists in the store (if SKU is being updated)
        if (data.sku && data.sku !== existingProduct.sku) {
            const duplicateSku = await database_1.db
                .select()
                .from(products_1.products)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.sku, data.sku), (0, drizzle_orm_1.eq)(products_1.products.storeId, existingProduct.storeId), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
            if (duplicateSku.length > 0) {
                throw new http_exception_1.HTTPException(400, {
                    message: "SKU already exists in this store",
                });
            }
        }
        if (imeis.length) {
            // Check all provided IMEIs for conflicts with other products
            const allExistingImeis = await database_1.db
                .select({
                imei: product_imeis_1.productImeis.imei,
                productId: product_imeis_1.productImeis.productId,
            })
                .from(product_imeis_1.productImeis);
            const conflictingImeis = data.imeis.filter((imei) => {
                const existing = allExistingImeis.find((existing) => existing.imei === imei);
                return existing && existing.productId !== id;
            });
            if (conflictingImeis.length > 0) {
                throw new http_exception_1.HTTPException(400, {
                    message: `IMEIs already exist in other products: ${conflictingImeis.join(", ")}`,
                });
            }
        }
        // Start a transaction to update product and replace IMEIs
        const result = await database_1.db.transaction(async (tx) => {
            // Prepare update data for product
            existingProduct = {
                ...existingProduct,
                ...newValue,
            };
            const updateData = {
                ...existingProduct,
                updatedAt: new Date(),
            };
            // Update product
            const updatedProduct = await tx
                .update(products_1.products)
                .set(updateData)
                .where((0, drizzle_orm_1.eq)(products_1.products.id, id))
                .returning();
            if (!updatedProduct[0]) {
                throw new http_exception_1.HTTPException(500, { message: "Failed to update product" });
            }
            // Remove all existing IMEIs for this product
            await tx.delete(product_imeis_1.productImeis).where((0, drizzle_orm_1.eq)(product_imeis_1.productImeis.productId, id));
            // Add new IMEIs
            const imeiRecords = data.imeis.map((imei) => ({
                id: (0, crypto_1.randomUUID)(),
                productId: id,
                imei: imei,
                createdBy: requestingUser.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
            const insertedImeis = await tx
                .insert(product_imeis_1.productImeis)
                .values(imeiRecords)
                .returning();
            return {
                product: updatedProduct[0],
                imeis: insertedImeis,
            };
        });
        const response = {
            id: result.product.id,
            name: result.product.name,
            storeId: result.product.storeId,
            categoryId: result.product.categoryId,
            sku: result.product.sku,
            isImei: result.product.isImei,
            barcode: result.product.barcode,
            quantity: result.product.quantity,
            purchasePrice: result.product.purchasePrice,
            salePrice: result.product.salePrice,
            createdBy: result.product.createdBy,
            createdAt: result.product.createdAt,
            updatedAt: result.product.updatedAt,
            imeis: result.imeis.map((imei) => ({
                id: imei.id,
                imei: imei.imei,
                createdBy: imei.createdBy,
                createdAt: imei.createdAt.toISOString(),
                updatedAt: imei.updatedAt.toISOString(),
            })),
        };
        console.log("updateProductWithImeis:", response);
        return response;
    }
    static async softDeleteProduct(id, _requestingUser) {
        // Find product to delete (authorization middleware has already checked access)
        const [existingProduct] = await database_1.db
            .select({
            id: products_1.products.id,
            name: products_1.products.name,
            storeOwnerId: stores_1.stores.ownerId,
        })
            .from(products_1.products)
            .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.id, id), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
        if (!existingProduct) {
            throw new http_exception_1.HTTPException(404, { message: "Product not found" });
        }
        // Perform soft delete by setting deletedAt timestamp
        const deletedProduct = await database_1.db
            .update(products_1.products)
            .set({
            deletedAt: new Date(),
            updatedAt: new Date(),
        })
            .where((0, drizzle_orm_1.eq)(products_1.products.id, id))
            .returning();
        if (!deletedProduct[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to delete product" });
        }
        return {
            id: deletedProduct[0].id,
            name: deletedProduct[0].name,
            deletedAt: deletedProduct[0].deletedAt,
        };
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map