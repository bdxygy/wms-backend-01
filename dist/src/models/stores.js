"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectStoreSchema = exports.insertStoreSchema = exports.storesRelations = exports.stores = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
const drizzle_orm_1 = require("drizzle-orm");
const users_1 = require("./users");
exports.stores = (0, sqlite_core_1.sqliteTable)("stores", {
    id: (0, sqlite_core_1.text)("id").primaryKey(),
    ownerId: (0, sqlite_core_1.text)("owner_id")
        .notNull()
        .references(() => users_1.users.id),
    name: (0, sqlite_core_1.text)("name").notNull(),
    type: (0, sqlite_core_1.text)("type").notNull(),
    addressLine1: (0, sqlite_core_1.text)("address_line1").notNull(),
    addressLine2: (0, sqlite_core_1.text)("address_line2"),
    city: (0, sqlite_core_1.text)("city").notNull(),
    province: (0, sqlite_core_1.text)("province").notNull(),
    postalCode: (0, sqlite_core_1.text)("postal_code").notNull(),
    country: (0, sqlite_core_1.text)("country").notNull(),
    phoneNumber: (0, sqlite_core_1.text)("phone_number").notNull(),
    email: (0, sqlite_core_1.text)("email"),
    isActive: (0, sqlite_core_1.integer)("is_active", { mode: "boolean" }).default(true),
    openTime: (0, sqlite_core_1.integer)("open_time", { mode: "timestamp" }),
    closeTime: (0, sqlite_core_1.integer)("close_time", { mode: "timestamp" }),
    timezone: (0, sqlite_core_1.text)("timezone").default("Asia/Jakarta"),
    mapLocation: (0, sqlite_core_1.text)("map_location"),
    createdBy: (0, sqlite_core_1.text)("created_by")
        .notNull()
        .references(() => users_1.users.id),
    createdAt: (0, sqlite_core_1.integer)("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: (0, sqlite_core_1.integer)("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deletedAt: (0, sqlite_core_1.integer)("deleted_at", { mode: "timestamp" }),
});
exports.storesRelations = (0, drizzle_orm_1.relations)(exports.stores, ({ one, many }) => ({
    owner: one(users_1.users, {
        fields: [exports.stores.ownerId],
        references: [users_1.users.id],
    }),
    createdByUser: one(users_1.users, {
        fields: [exports.stores.createdBy],
        references: [users_1.users.id],
    }),
}));
exports.insertStoreSchema = (0, drizzle_zod_1.createInsertSchema)(exports.stores);
exports.selectStoreSchema = (0, drizzle_zod_1.createSelectSchema)(exports.stores);
//# sourceMappingURL=stores.js.map