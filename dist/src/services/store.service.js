"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const crypto_1 = require("crypto");
const database_1 = require("../config/database");
const stores_1 = require("../models/stores");
const drizzle_orm_1 = require("drizzle-orm");
const http_exception_1 = require("hono/http-exception");
class StoreService {
    static async createStore(data, createdBy) {
        // Create store
        const storeId = (0, crypto_1.randomUUID)();
        const store = await database_1.db
            .insert(stores_1.stores)
            .values({
            id: storeId,
            ownerId: createdBy.id,
            name: data.name,
            type: data.type,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2 || null,
            city: data.city,
            province: data.province,
            postalCode: data.postalCode,
            country: data.country,
            phoneNumber: data.phoneNumber,
            email: data.email || null,
            isActive: true,
            openTime: data.openTime ? new Date(data.openTime) : null,
            closeTime: data.closeTime ? new Date(data.closeTime) : null,
            timezone: data.timezone || "Asia/Jakarta",
            mapLocation: data.mapLocation || null,
            createdBy: createdBy.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
            .returning();
        if (!store[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to create store" });
        }
        return {
            id: store[0].id,
            ownerId: store[0].ownerId,
            name: store[0].name,
            type: store[0].type,
            addressLine1: store[0].addressLine1,
            addressLine2: store[0].addressLine2,
            city: store[0].city,
            province: store[0].province,
            postalCode: store[0].postalCode,
            country: store[0].country,
            phoneNumber: store[0].phoneNumber,
            email: store[0].email,
            isActive: store[0].isActive,
            openTime: store[0].openTime?.toISOString() || null,
            closeTime: store[0].closeTime?.toISOString() || null,
            timezone: store[0].timezone,
            mapLocation: store[0].mapLocation,
            createdBy: store[0].createdBy,
            createdAt: store[0].createdAt.toISOString(),
            updatedAt: store[0].updatedAt.toISOString(),
        };
    }
    static async getStoreById(id, requestingUser) {
        const store = await database_1.db
            .select()
            .from(stores_1.stores)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(stores_1.stores.id, id), (0, drizzle_orm_1.isNull)(stores_1.stores.deletedAt)));
        if (!store[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Store not found" });
        }
        return {
            id: store[0].id,
            ownerId: store[0].ownerId,
            name: store[0].name,
            type: store[0].type,
            addressLine1: store[0].addressLine1,
            addressLine2: store[0].addressLine2,
            city: store[0].city,
            province: store[0].province,
            postalCode: store[0].postalCode,
            country: store[0].country,
            phoneNumber: store[0].phoneNumber,
            email: store[0].email,
            isActive: store[0].isActive,
            openTime: store[0].openTime?.toISOString() || null,
            closeTime: store[0].closeTime?.toISOString() || null,
            timezone: store[0].timezone,
            mapLocation: store[0].mapLocation,
            createdBy: store[0].createdBy,
            createdAt: store[0].createdAt.toISOString(),
            updatedAt: store[0].updatedAt.toISOString(),
        };
    }
    static async listStores(query, requestingUser) {
        // Build where conditions
        const conditions = [(0, drizzle_orm_1.isNull)(stores_1.stores.deletedAt)];
        // Owner scoping - only show stores owned by the user's owner
        if (requestingUser.role === "OWNER") {
            conditions.push((0, drizzle_orm_1.eq)(stores_1.stores.ownerId, requestingUser.id));
        }
        else {
            conditions.push((0, drizzle_orm_1.eq)(stores_1.stores.ownerId, requestingUser.ownerId));
        }
        // Search filter
        if (query.search) {
            conditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(stores_1.stores.name, `%${query.search}%`), (0, drizzle_orm_1.ilike)(stores_1.stores.city, `%${query.search}%`), (0, drizzle_orm_1.ilike)(stores_1.stores.province, `%${query.search}%`)));
        }
        // Type filter
        if (query.type) {
            conditions.push((0, drizzle_orm_1.eq)(stores_1.stores.type, query.type));
        }
        // Active filter
        if (query.isActive !== undefined) {
            conditions.push((0, drizzle_orm_1.eq)(stores_1.stores.isActive, query.isActive));
        }
        // City filter
        if (query.city) {
            conditions.push((0, drizzle_orm_1.ilike)(stores_1.stores.city, `%${query.city}%`));
        }
        // Province filter
        if (query.province) {
            conditions.push((0, drizzle_orm_1.ilike)(stores_1.stores.province, `%${query.province}%`));
        }
        const whereClause = conditions.length > 0 ? (0, drizzle_orm_1.and)(...conditions) : undefined;
        // Get total count
        const totalResult = await database_1.db
            .select({ count: (0, drizzle_orm_1.count)() })
            .from(stores_1.stores)
            .where(whereClause);
        const total = totalResult[0].count;
        const totalPages = Math.ceil(total / query.limit);
        const offset = (query.page - 1) * query.limit;
        // Get stores with pagination
        const storeList = await database_1.db
            .select()
            .from(stores_1.stores)
            .where(whereClause)
            .limit(query.limit)
            .offset(offset)
            .orderBy(stores_1.stores.createdAt);
        return {
            stores: storeList.map((store) => ({
                id: store.id,
                ownerId: store.ownerId,
                name: store.name,
                type: store.type,
                addressLine1: store.addressLine1,
                addressLine2: store.addressLine2,
                city: store.city,
                province: store.province,
                postalCode: store.postalCode,
                country: store.country,
                phoneNumber: store.phoneNumber,
                email: store.email,
                isActive: store.isActive,
                openTime: store.openTime?.toISOString() || null,
                closeTime: store.closeTime?.toISOString() || null,
                timezone: store.timezone,
                mapLocation: store.mapLocation,
                createdBy: store.createdBy,
                createdAt: store.createdAt.toISOString(),
                updatedAt: store.updatedAt.toISOString(),
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
    static async updateStore(id, data, requestingUser) {
        // Find store to update
        const existingStore = await database_1.db
            .select()
            .from(stores_1.stores)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(stores_1.stores.id, id), (0, drizzle_orm_1.isNull)(stores_1.stores.deletedAt)));
        if (!existingStore[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Store not found" });
        }
        // Prepare update data
        const updateData = {
            updatedAt: new Date(),
        };
        if (data.name !== undefined)
            updateData.name = data.name;
        if (data.type !== undefined)
            updateData.type = data.type;
        if (data.addressLine1 !== undefined)
            updateData.addressLine1 = data.addressLine1;
        if (data.addressLine2 !== undefined)
            updateData.addressLine2 = data.addressLine2;
        if (data.city !== undefined)
            updateData.city = data.city;
        if (data.province !== undefined)
            updateData.province = data.province;
        if (data.postalCode !== undefined)
            updateData.postalCode = data.postalCode;
        if (data.country !== undefined)
            updateData.country = data.country;
        if (data.phoneNumber !== undefined)
            updateData.phoneNumber = data.phoneNumber;
        if (data.email !== undefined)
            updateData.email = data.email;
        if (data.isActive !== undefined)
            updateData.isActive = data.isActive;
        if (data.openTime !== undefined)
            updateData.openTime = data.openTime ? new Date(data.openTime) : null;
        if (data.closeTime !== undefined)
            updateData.closeTime = data.closeTime ? new Date(data.closeTime) : null;
        if (data.timezone !== undefined)
            updateData.timezone = data.timezone;
        if (data.mapLocation !== undefined)
            updateData.mapLocation = data.mapLocation;
        // Update store
        const updatedStore = await database_1.db
            .update(stores_1.stores)
            .set(updateData)
            .where((0, drizzle_orm_1.eq)(stores_1.stores.id, id))
            .returning();
        if (!updatedStore[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to update store" });
        }
        return {
            id: updatedStore[0].id,
            ownerId: updatedStore[0].ownerId,
            name: updatedStore[0].name,
            type: updatedStore[0].type,
            addressLine1: updatedStore[0].addressLine1,
            addressLine2: updatedStore[0].addressLine2,
            city: updatedStore[0].city,
            province: updatedStore[0].province,
            postalCode: updatedStore[0].postalCode,
            country: updatedStore[0].country,
            phoneNumber: updatedStore[0].phoneNumber,
            email: updatedStore[0].email,
            isActive: updatedStore[0].isActive,
            openTime: updatedStore[0].openTime?.toISOString() || null,
            closeTime: updatedStore[0].closeTime?.toISOString() || null,
            timezone: updatedStore[0].timezone,
            mapLocation: updatedStore[0].mapLocation,
            createdBy: updatedStore[0].createdBy,
            createdAt: updatedStore[0].createdAt.toISOString(),
            updatedAt: updatedStore[0].updatedAt.toISOString(),
        };
    }
}
exports.StoreService = StoreService;
//# sourceMappingURL=store.service.js.map