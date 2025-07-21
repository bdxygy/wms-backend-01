"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const crypto_1 = require("crypto");
const database_1 = require("../config/database");
const categories_1 = require("../models/categories");
const stores_1 = require("../models/stores");
const drizzle_orm_1 = require("drizzle-orm");
const http_exception_1 = require("hono/http-exception");
class CategoryService {
    static async createCategory(data, createdBy) {
        // Verify store exists (authorization middleware has already checked role and access)
        const store = await database_1.db
            .select()
            .from(stores_1.stores)
            .where((0, drizzle_orm_1.eq)(stores_1.stores.id, data.storeId));
        if (!store[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Store not found" });
        }
        // Check if category name already exists in the store
        const existingCategory = await database_1.db
            .select()
            .from(categories_1.categories)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(categories_1.categories.name, data.name), (0, drizzle_orm_1.eq)(categories_1.categories.storeId, data.storeId), (0, drizzle_orm_1.isNull)(categories_1.categories.deletedAt)));
        if (existingCategory.length > 0) {
            throw new http_exception_1.HTTPException(400, { message: "Category name already exists in this store" });
        }
        // Create category
        const categoryId = (0, crypto_1.randomUUID)();
        const category = await database_1.db.insert(categories_1.categories).values({
            id: categoryId,
            name: data.name,
            storeId: data.storeId,
            createdBy: createdBy.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning();
        if (!category[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to create category" });
        }
        return {
            id: category[0].id,
            name: category[0].name,
            storeId: category[0].storeId,
            createdBy: category[0].createdBy,
            createdAt: category[0].createdAt,
            updatedAt: category[0].updatedAt,
        };
    }
    static async getCategoryById(id) {
        const category = await database_1.db
            .select({
            id: categories_1.categories.id,
            name: categories_1.categories.name,
            storeId: categories_1.categories.storeId,
            createdBy: categories_1.categories.createdBy,
            createdAt: categories_1.categories.createdAt,
            updatedAt: categories_1.categories.updatedAt,
        })
            .from(categories_1.categories)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(categories_1.categories.id, id), (0, drizzle_orm_1.isNull)(categories_1.categories.deletedAt)));
        if (!category[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Category not found" });
        }
        return {
            id: category[0].id,
            name: category[0].name,
            storeId: category[0].storeId,
            createdBy: category[0].createdBy,
            createdAt: category[0].createdAt,
            updatedAt: category[0].updatedAt,
        };
    }
    static async listCategories(query, requestingUser) {
        // Build where conditions
        const conditions = [];
        // Owner scoping - only show categories from stores owned by the user's owner
        if (requestingUser.role === "OWNER") {
            conditions.push((0, drizzle_orm_1.eq)(stores_1.stores.ownerId, requestingUser.id));
        }
        else {
            conditions.push((0, drizzle_orm_1.eq)(stores_1.stores.ownerId, requestingUser.ownerId));
        }
        // Store filter
        if (query.storeId) {
            conditions.push((0, drizzle_orm_1.eq)(categories_1.categories.storeId, query.storeId));
        }
        // Search filter
        if (query.search) {
            conditions.push((0, drizzle_orm_1.like)(categories_1.categories.name, `%${query.search}%`));
        }
        // Exclude deleted categories
        conditions.push((0, drizzle_orm_1.isNull)(categories_1.categories.deletedAt));
        const whereClause = (0, drizzle_orm_1.and)(...conditions);
        // Get total count
        const totalResult = await database_1.db
            .select({ count: (0, drizzle_orm_1.count)() })
            .from(categories_1.categories)
            .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(categories_1.categories.storeId, stores_1.stores.id))
            .where(whereClause);
        const total = totalResult[0].count;
        const totalPages = Math.ceil(total / query.limit);
        const offset = (query.page - 1) * query.limit;
        // Get categories with pagination
        const categoryList = await database_1.db
            .select({
            id: categories_1.categories.id,
            name: categories_1.categories.name,
            storeId: categories_1.categories.storeId,
            createdBy: categories_1.categories.createdBy,
            createdAt: categories_1.categories.createdAt,
            updatedAt: categories_1.categories.updatedAt,
        })
            .from(categories_1.categories)
            .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(categories_1.categories.storeId, stores_1.stores.id))
            .where(whereClause)
            .limit(query.limit)
            .offset(offset)
            .orderBy(categories_1.categories.createdAt);
        return {
            categories: categoryList,
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
    static async updateCategory(id, data, requestingUser) {
        // Find category to update (authorization middleware has already checked access)
        const existingCategory = await database_1.db
            .select({
            id: categories_1.categories.id,
            name: categories_1.categories.name,
            storeId: categories_1.categories.storeId,
            createdBy: categories_1.categories.createdBy,
        })
            .from(categories_1.categories)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(categories_1.categories.id, id), (0, drizzle_orm_1.isNull)(categories_1.categories.deletedAt)));
        if (!existingCategory[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Category not found" });
        }
        // Check if category name already exists in the store (if name is being updated)
        if (data.name && data.name !== existingCategory[0].name) {
            const duplicateCategory = await database_1.db
                .select()
                .from(categories_1.categories)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(categories_1.categories.name, data.name), (0, drizzle_orm_1.eq)(categories_1.categories.storeId, existingCategory[0].storeId), (0, drizzle_orm_1.isNull)(categories_1.categories.deletedAt)));
            if (duplicateCategory.length > 0) {
                throw new http_exception_1.HTTPException(400, { message: "Category name already exists in this store" });
            }
        }
        // Prepare update data
        const updateData = {
            updatedAt: new Date(),
        };
        if (data.name)
            updateData.name = data.name;
        // Update category
        const updatedCategory = await database_1.db
            .update(categories_1.categories)
            .set(updateData)
            .where((0, drizzle_orm_1.eq)(categories_1.categories.id, id))
            .returning();
        if (!updatedCategory[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to update category" });
        }
        return {
            id: updatedCategory[0].id,
            name: updatedCategory[0].name,
            storeId: updatedCategory[0].storeId,
            createdBy: updatedCategory[0].createdBy,
            createdAt: updatedCategory[0].createdAt,
            updatedAt: updatedCategory[0].updatedAt,
        };
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map