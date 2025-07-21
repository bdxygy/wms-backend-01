"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProductSchema = exports.insertProductSchema = exports.productsRelations = exports.products = exports.productStatus = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
const drizzle_orm_1 = require("drizzle-orm");
const users_1 = require("./users");
const stores_1 = require("./stores");
const categories_1 = require("./categories");
const transactions_1 = require("./transactions");
const product_checks_1 = require("./product_checks");
const product_imeis_1 = require("./product_imeis");
exports.productStatus = ['ACTIVE', 'INACTIVE', 'DISCONTINUED'];
exports.products = (0, sqlite_core_1.sqliteTable)('products', {
    id: (0, sqlite_core_1.text)('id').primaryKey(),
    createdBy: (0, sqlite_core_1.text)('created_by').notNull().references(() => users_1.users.id),
    storeId: (0, sqlite_core_1.text)('store_id').notNull().references(() => stores_1.stores.id),
    name: (0, sqlite_core_1.text)('name').notNull(),
    categoryId: (0, sqlite_core_1.text)('category_id').references(() => categories_1.categories.id),
    sku: (0, sqlite_core_1.text)('sku').notNull(),
    isImei: (0, sqlite_core_1.integer)('is_imei', { mode: 'boolean' }).default(false),
    barcode: (0, sqlite_core_1.text)('barcode').notNull(),
    quantity: (0, sqlite_core_1.integer)('quantity').default(1).notNull(),
    purchasePrice: (0, sqlite_core_1.real)('purchase_price').notNull(),
    salePrice: (0, sqlite_core_1.real)('sale_price'),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    updatedAt: (0, sqlite_core_1.integer)('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    deletedAt: (0, sqlite_core_1.integer)('deleted_at', { mode: 'timestamp' }),
}, (table) => ({
    // Unique constraint: SKU must be unique within each store (excluding soft-deleted products)
    uniqueSkuPerStore: (0, sqlite_core_1.unique)('unique_sku_per_store').on(table.sku, table.storeId),
    // Unique constraint: Barcode must be globally unique (excluding soft-deleted products)
    uniqueBarcode: (0, sqlite_core_1.unique)('unique_barcode').on(table.barcode),
}));
exports.productsRelations = (0, drizzle_orm_1.relations)(exports.products, ({ one, many }) => ({
    store: one(stores_1.stores, {
        fields: [exports.products.storeId],
        references: [stores_1.stores.id],
    }),
    category: one(categories_1.categories, {
        fields: [exports.products.categoryId],
        references: [categories_1.categories.id],
    }),
    createdByUser: one(users_1.users, {
        fields: [exports.products.createdBy],
        references: [users_1.users.id],
    }),
    transactionItems: many(transactions_1.transactionItems),
    productChecks: many(product_checks_1.productChecks),
    productImeis: many(product_imeis_1.productImeis),
}));
exports.insertProductSchema = (0, drizzle_zod_1.createInsertSchema)(exports.products);
exports.selectProductSchema = (0, drizzle_zod_1.createSelectSchema)(exports.products);
//# sourceMappingURL=products.js.map