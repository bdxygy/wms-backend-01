"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCategorySchema = exports.insertCategorySchema = exports.categoriesRelations = exports.categories = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
const drizzle_orm_1 = require("drizzle-orm");
const users_1 = require("./users");
const stores_1 = require("./stores");
exports.categories = (0, sqlite_core_1.sqliteTable)("categories", {
    id: (0, sqlite_core_1.text)("id").primaryKey(),
    storeId: (0, sqlite_core_1.text)("store_id").notNull(),
    name: (0, sqlite_core_1.text)("name").notNull(),
    createdBy: (0, sqlite_core_1.text)("created_by").notNull(),
    createdAt: (0, sqlite_core_1.integer)("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: (0, sqlite_core_1.integer)("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deletedAt: (0, sqlite_core_1.integer)("deleted_at", { mode: "timestamp" }),
}, (table) => [
    (0, sqlite_core_1.foreignKey)({
        columns: [table.storeId],
        foreignColumns: [stores_1.stores.id],
        name: "category_store_fk",
    }),
    (0, sqlite_core_1.foreignKey)({
        columns: [table.createdBy],
        foreignColumns: [users_1.users.id],
        name: "category_created_by_fk",
    }),
]);
exports.categoriesRelations = (0, drizzle_orm_1.relations)(exports.categories, ({ one }) => ({
    store: one(stores_1.stores, {
        fields: [exports.categories.storeId],
        references: [stores_1.stores.id],
        relationName: "category_store",
    }),
    createdByUser: one(users_1.users, {
        fields: [exports.categories.createdBy],
        references: [users_1.users.id],
        relationName: "category_created_by",
    }),
}));
exports.insertCategorySchema = (0, drizzle_zod_1.createInsertSchema)(exports.categories);
exports.selectCategorySchema = (0, drizzle_zod_1.createSelectSchema)(exports.categories);
//# sourceMappingURL=categories.js.map