"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProductCheckSchema = exports.insertProductCheckSchema = exports.productChecksRelations = exports.productChecks = exports.checkStatus = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
const drizzle_orm_1 = require("drizzle-orm");
const users_1 = require("./users");
const stores_1 = require("./stores");
const products_1 = require("./products");
exports.checkStatus = ['PENDING', 'OK', 'MISSING', 'BROKEN'];
exports.productChecks = (0, sqlite_core_1.sqliteTable)('product_checks', {
    id: (0, sqlite_core_1.text)('id').primaryKey(),
    productId: (0, sqlite_core_1.text)('product_id').notNull().references(() => products_1.products.id),
    checkedBy: (0, sqlite_core_1.text)('checked_by').notNull().references(() => users_1.users.id),
    storeId: (0, sqlite_core_1.text)('store_id').notNull().references(() => stores_1.stores.id),
    status: (0, sqlite_core_1.text)('status', { enum: exports.checkStatus }).notNull(),
    note: (0, sqlite_core_1.text)('note'),
    checkedAt: (0, sqlite_core_1.integer)('checked_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
exports.productChecksRelations = (0, drizzle_orm_1.relations)(exports.productChecks, ({ one }) => ({
    product: one(products_1.products, {
        fields: [exports.productChecks.productId],
        references: [products_1.products.id],
    }),
    store: one(stores_1.stores, {
        fields: [exports.productChecks.storeId],
        references: [stores_1.stores.id],
    }),
    checkedByUser: one(users_1.users, {
        fields: [exports.productChecks.checkedBy],
        references: [users_1.users.id],
    }),
}));
exports.insertProductCheckSchema = (0, drizzle_zod_1.createInsertSchema)(exports.productChecks);
exports.selectProductCheckSchema = (0, drizzle_zod_1.createSelectSchema)(exports.productChecks);
//# sourceMappingURL=product_checks.js.map