"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectTransactionItemSchema = exports.insertTransactionItemSchema = exports.selectTransactionSchema = exports.insertTransactionSchema = exports.transactionItemsRelations = exports.transactionsRelations = exports.transactionItems = exports.transactions = exports.transactionTypes = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
const drizzle_orm_1 = require("drizzle-orm");
const users_1 = require("./users");
const stores_1 = require("./stores");
const products_1 = require("./products");
const crypto_1 = require("crypto");
exports.transactionTypes = ['SALE', 'TRANSFER'];
exports.transactions = (0, sqlite_core_1.sqliteTable)('transactions', {
    id: (0, sqlite_core_1.text)('id').primaryKey(),
    type: (0, sqlite_core_1.text)('type', { enum: exports.transactionTypes }).notNull(),
    createdBy: (0, sqlite_core_1.text)('created_by').references(() => users_1.users.id),
    approvedBy: (0, sqlite_core_1.text)('approved_by').references(() => users_1.users.id),
    fromStoreId: (0, sqlite_core_1.text)('from_store_id').references(() => stores_1.stores.id),
    toStoreId: (0, sqlite_core_1.text)('to_store_id').references(() => stores_1.stores.id),
    photoProofUrl: (0, sqlite_core_1.text)('photo_proof_url'),
    transferProofUrl: (0, sqlite_core_1.text)('transfer_proof_url'),
    to: (0, sqlite_core_1.text)('to'),
    customerPhone: (0, sqlite_core_1.text)('customer_phone'),
    amount: (0, sqlite_core_1.real)('amount'),
    isFinished: (0, sqlite_core_1.integer)('is_finished', { mode: 'boolean' }).default(false),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
exports.transactionItems = (0, sqlite_core_1.sqliteTable)('transaction_items', {
    id: (0, sqlite_core_1.text)('id').primaryKey().$defaultFn(() => (0, crypto_1.randomUUID)()),
    transactionId: (0, sqlite_core_1.text)('transaction_id').notNull().references(() => exports.transactions.id),
    productId: (0, sqlite_core_1.text)('product_id').notNull().references(() => products_1.products.id),
    name: (0, sqlite_core_1.text)('name').notNull(),
    price: (0, sqlite_core_1.real)('price').notNull(),
    quantity: (0, sqlite_core_1.integer)('quantity').notNull(),
    amount: (0, sqlite_core_1.real)('amount'),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
exports.transactionsRelations = (0, drizzle_orm_1.relations)(exports.transactions, ({ one, many }) => ({
    transactionItems: many(exports.transactionItems),
    createdByUser: one(users_1.users, {
        fields: [exports.transactions.createdBy],
        references: [users_1.users.id],
    }),
    approvedByUser: one(users_1.users, {
        fields: [exports.transactions.approvedBy],
        references: [users_1.users.id],
    }),
    fromStore: one(stores_1.stores, {
        fields: [exports.transactions.fromStoreId],
        references: [stores_1.stores.id],
    }),
    toStore: one(stores_1.stores, {
        fields: [exports.transactions.toStoreId],
        references: [stores_1.stores.id],
    }),
}));
exports.transactionItemsRelations = (0, drizzle_orm_1.relations)(exports.transactionItems, ({ one }) => ({
    transaction: one(exports.transactions, {
        fields: [exports.transactionItems.transactionId],
        references: [exports.transactions.id],
    }),
    product: one(products_1.products, {
        fields: [exports.transactionItems.productId],
        references: [products_1.products.id],
    }),
}));
exports.insertTransactionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.transactions);
exports.selectTransactionSchema = (0, drizzle_zod_1.createSelectSchema)(exports.transactions);
exports.insertTransactionItemSchema = (0, drizzle_zod_1.createInsertSchema)(exports.transactionItems);
exports.selectTransactionItemSchema = (0, drizzle_zod_1.createSelectSchema)(exports.transactionItems);
//# sourceMappingURL=transactions.js.map