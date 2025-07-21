"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProductImeiSchema = exports.insertProductImeiSchema = exports.productImeisRelations = exports.productImeis = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
const drizzle_orm_1 = require("drizzle-orm");
const products_1 = require("./products");
const users_1 = require("./users");
exports.productImeis = (0, sqlite_core_1.sqliteTable)('product_imeis', {
    id: (0, sqlite_core_1.text)('id').primaryKey(),
    productId: (0, sqlite_core_1.text)('product_id').notNull().references(() => products_1.products.id),
    imei: (0, sqlite_core_1.text)('imei').notNull(),
    createdBy: (0, sqlite_core_1.text)('created_by').notNull().references(() => users_1.users.id),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    updatedAt: (0, sqlite_core_1.integer)('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
exports.productImeisRelations = (0, drizzle_orm_1.relations)(exports.productImeis, ({ one }) => ({
    product: one(products_1.products, {
        fields: [exports.productImeis.productId],
        references: [products_1.products.id],
    }),
    createdBy: one(users_1.users, {
        fields: [exports.productImeis.createdBy],
        references: [users_1.users.id],
    }),
}));
exports.insertProductImeiSchema = (0, drizzle_zod_1.createInsertSchema)(exports.productImeis);
exports.selectProductImeiSchema = (0, drizzle_zod_1.createSelectSchema)(exports.productImeis);
//# sourceMappingURL=product_imeis.js.map