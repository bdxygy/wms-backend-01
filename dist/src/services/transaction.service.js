"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const crypto_1 = require("crypto");
const database_1 = require("../config/database");
const transactions_1 = require("../models/transactions");
const stores_1 = require("../models/stores");
const products_1 = require("../models/products");
const drizzle_orm_1 = require("drizzle-orm");
const http_exception_1 = require("hono/http-exception");
class TransactionService {
    static async createTransaction(data, createdBy) {
        // Verify stores exist (authorization middleware has already checked role and access)
        const storeChecks = [];
        if (data.fromStoreId) {
            const fromStore = await database_1.db
                .select()
                .from(stores_1.stores)
                .where((0, drizzle_orm_1.eq)(stores_1.stores.id, data.fromStoreId));
            if (!fromStore[0]) {
                throw new http_exception_1.HTTPException(404, { message: "From store not found" });
            }
            storeChecks.push(fromStore[0]);
        }
        if (data.toStoreId) {
            const toStore = await database_1.db
                .select()
                .from(stores_1.stores)
                .where((0, drizzle_orm_1.eq)(stores_1.stores.id, data.toStoreId));
            if (!toStore[0]) {
                throw new http_exception_1.HTTPException(404, { message: "To store not found" });
            }
            storeChecks.push(toStore[0]);
        }
        // Store access checks have been handled by authorization middleware
        // Verify all products exist and calculate total amount
        let totalAmount = 0;
        const productChecks = [];
        for (const item of data.items) {
            const product = await database_1.db
                .select({
                id: products_1.products.id,
                name: products_1.products.name,
                storeId: products_1.products.storeId,
                quantity: products_1.products.quantity,
                salePrice: products_1.products.salePrice,
                purchasePrice: products_1.products.purchasePrice,
                storeOwnerId: stores_1.stores.ownerId,
            })
                .from(products_1.products)
                .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.id, item.productId), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
            if (!product[0]) {
                throw new http_exception_1.HTTPException(404, { message: `Product ${item.productId} not found` });
            }
            // Product access checks have been handled by authorization middleware
            // Check if sufficient quantity is available
            if (product[0].quantity < item.quantity) {
                throw new http_exception_1.HTTPException(400, { message: `Insufficient quantity for product ${product[0].name}` });
            }
            // For SALE transactions, validate product belongs to fromStore or toStore
            if (data.type === "SALE") {
                const validStore = data.fromStoreId === product[0].storeId || data.toStoreId === product[0].storeId;
                if (!validStore) {
                    throw new http_exception_1.HTTPException(400, { message: `Product ${product[0].name} does not belong to the specified store` });
                }
            }
            productChecks.push(product[0]);
            totalAmount += item.amount;
        }
        // Create transaction
        const transactionId = (0, crypto_1.randomUUID)();
        const transaction = await database_1.db.insert(transactions_1.transactions).values({
            id: transactionId,
            type: data.type,
            createdBy: createdBy.id,
            approvedBy: null,
            fromStoreId: data.fromStoreId || null,
            toStoreId: data.toStoreId || null,
            photoProofUrl: data.photoProofUrl || null,
            transferProofUrl: data.transferProofUrl || null,
            to: data.to || null,
            customerPhone: data.customerPhone || null,
            amount: totalAmount,
            isFinished: false,
            createdAt: new Date(),
        }).returning();
        if (!transaction[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to create transaction" });
        }
        // Create transaction items
        const itemsToInsert = data.items.map(item => ({
            id: (0, crypto_1.randomUUID)(),
            transactionId: transactionId,
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            amount: item.amount,
            createdAt: new Date(),
        }));
        const insertedItems = await database_1.db.insert(transactions_1.transactionItems).values(itemsToInsert).returning();
        return {
            id: transaction[0].id,
            type: transaction[0].type,
            createdBy: transaction[0].createdBy,
            approvedBy: transaction[0].approvedBy,
            fromStoreId: transaction[0].fromStoreId,
            toStoreId: transaction[0].toStoreId,
            photoProofUrl: transaction[0].photoProofUrl,
            transferProofUrl: transaction[0].transferProofUrl,
            to: transaction[0].to,
            customerPhone: transaction[0].customerPhone,
            amount: transaction[0].amount,
            isFinished: transaction[0].isFinished,
            createdAt: transaction[0].createdAt,
            items: insertedItems.map(item => ({
                id: item.id,
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                amount: item.amount,
                createdAt: item.createdAt,
            })),
        };
    }
    static async getTransactionById(id) {
        const transaction = await database_1.db
            .select({
            id: transactions_1.transactions.id,
            type: transactions_1.transactions.type,
            createdBy: transactions_1.transactions.createdBy,
            approvedBy: transactions_1.transactions.approvedBy,
            fromStoreId: transactions_1.transactions.fromStoreId,
            toStoreId: transactions_1.transactions.toStoreId,
            photoProofUrl: transactions_1.transactions.photoProofUrl,
            transferProofUrl: transactions_1.transactions.transferProofUrl,
            to: transactions_1.transactions.to,
            customerPhone: transactions_1.transactions.customerPhone,
            amount: transactions_1.transactions.amount,
            isFinished: transactions_1.transactions.isFinished,
            createdAt: transactions_1.transactions.createdAt,
            fromStoreOwnerId: stores_1.stores.ownerId,
        })
            .from(transactions_1.transactions)
            .leftJoin(stores_1.stores, (0, drizzle_orm_1.eq)(transactions_1.transactions.fromStoreId, stores_1.stores.id))
            .where((0, drizzle_orm_1.eq)(transactions_1.transactions.id, id));
        if (!transaction[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Transaction not found" });
        }
        // Authorization middleware has already checked transaction access
        // Get transaction items
        const items = await database_1.db
            .select()
            .from(transactions_1.transactionItems)
            .where((0, drizzle_orm_1.eq)(transactions_1.transactionItems.transactionId, id));
        return {
            id: transaction[0].id,
            type: transaction[0].type,
            createdBy: transaction[0].createdBy,
            approvedBy: transaction[0].approvedBy,
            fromStoreId: transaction[0].fromStoreId,
            toStoreId: transaction[0].toStoreId,
            photoProofUrl: transaction[0].photoProofUrl,
            transferProofUrl: transaction[0].transferProofUrl,
            to: transaction[0].to,
            customerPhone: transaction[0].customerPhone,
            amount: transaction[0].amount,
            isFinished: transaction[0].isFinished,
            createdAt: transaction[0].createdAt,
            items: items.map(item => ({
                id: item.id,
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                amount: item.amount,
                createdAt: item.createdAt,
            })),
        };
    }
    static async listTransactions(query, requestingUser) {
        // Build where conditions
        const conditions = [];
        // Owner scoping - only show transactions from stores owned by the user's owner
        if (requestingUser.role === "OWNER") {
            // Get all stores owned by the user
            const userStores = await database_1.db
                .select({ id: stores_1.stores.id })
                .from(stores_1.stores)
                .where((0, drizzle_orm_1.eq)(stores_1.stores.ownerId, requestingUser.id));
            const storeIds = userStores.map(store => store.id);
            if (storeIds.length > 0) {
                conditions.push((0, drizzle_orm_1.or)(...storeIds.map(storeId => (0, drizzle_orm_1.eq)(transactions_1.transactions.fromStoreId, storeId)), ...storeIds.map(storeId => (0, drizzle_orm_1.eq)(transactions_1.transactions.toStoreId, storeId))));
            }
            else {
                // No stores owned, return empty result
                return {
                    transactions: [],
                    pagination: {
                        page: query.page,
                        limit: query.limit,
                        total: 0,
                        totalPages: 0,
                        hasNext: false,
                        hasPrev: false,
                    },
                };
            }
        }
        else {
            // Get all stores owned by the user's owner
            const userStores = await database_1.db
                .select({ id: stores_1.stores.id })
                .from(stores_1.stores)
                .where((0, drizzle_orm_1.eq)(stores_1.stores.ownerId, requestingUser.ownerId));
            const storeIds = userStores.map(store => store.id);
            if (storeIds.length > 0) {
                conditions.push((0, drizzle_orm_1.or)(...storeIds.map(storeId => (0, drizzle_orm_1.eq)(transactions_1.transactions.fromStoreId, storeId)), ...storeIds.map(storeId => (0, drizzle_orm_1.eq)(transactions_1.transactions.toStoreId, storeId))));
            }
            else {
                // No stores available, return empty result
                return {
                    transactions: [],
                    pagination: {
                        page: query.page,
                        limit: query.limit,
                        total: 0,
                        totalPages: 0,
                        hasNext: false,
                        hasPrev: false,
                    },
                };
            }
        }
        // Type filter
        if (query.type) {
            conditions.push((0, drizzle_orm_1.eq)(transactions_1.transactions.type, query.type));
        }
        // Store filter
        if (query.storeId) {
            conditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.eq)(transactions_1.transactions.fromStoreId, query.storeId), (0, drizzle_orm_1.eq)(transactions_1.transactions.toStoreId, query.storeId)));
        }
        // Finished filter
        if (query.isFinished !== undefined) {
            conditions.push((0, drizzle_orm_1.eq)(transactions_1.transactions.isFinished, query.isFinished));
        }
        // Date filters
        if (query.startDate) {
            conditions.push((0, drizzle_orm_1.gte)(transactions_1.transactions.createdAt, query.startDate));
        }
        if (query.endDate) {
            conditions.push((0, drizzle_orm_1.lte)(transactions_1.transactions.createdAt, query.endDate));
        }
        // Amount filters
        if (query.minAmount !== undefined) {
            conditions.push((0, drizzle_orm_1.gte)(transactions_1.transactions.amount, query.minAmount));
        }
        if (query.maxAmount !== undefined) {
            conditions.push((0, drizzle_orm_1.lte)(transactions_1.transactions.amount, query.maxAmount));
        }
        const whereClause = (0, drizzle_orm_1.and)(...conditions);
        // Get total count
        const totalResult = await database_1.db
            .select({ count: (0, drizzle_orm_1.count)() })
            .from(transactions_1.transactions)
            .where(whereClause);
        const total = totalResult[0].count;
        const totalPages = Math.ceil(total / query.limit);
        const offset = (query.page - 1) * query.limit;
        // Get transactions with pagination
        const transactionList = await database_1.db
            .select()
            .from(transactions_1.transactions)
            .where(whereClause)
            .limit(query.limit)
            .offset(offset)
            .orderBy(transactions_1.transactions.createdAt);
        // Get items for each transaction
        const transactionWithItems = await Promise.all(transactionList.map(async (transaction) => {
            const items = await database_1.db
                .select()
                .from(transactions_1.transactionItems)
                .where((0, drizzle_orm_1.eq)(transactions_1.transactionItems.transactionId, transaction.id));
            return {
                id: transaction.id,
                type: transaction.type,
                createdBy: transaction.createdBy,
                approvedBy: transaction.approvedBy,
                fromStoreId: transaction.fromStoreId,
                toStoreId: transaction.toStoreId,
                photoProofUrl: transaction.photoProofUrl,
                transferProofUrl: transaction.transferProofUrl,
                to: transaction.to,
                customerPhone: transaction.customerPhone,
                amount: transaction.amount,
                isFinished: transaction.isFinished,
                createdAt: transaction.createdAt,
                items: items.map(item => ({
                    id: item.id,
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    amount: item.amount,
                    createdAt: item.createdAt,
                })),
            };
        }));
        return {
            transactions: transactionWithItems,
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
    static async updateTransaction(id, data, requestingUser) {
        // Find transaction to update
        const existingTransaction = await database_1.db
            .select()
            .from(transactions_1.transactions)
            .where((0, drizzle_orm_1.eq)(transactions_1.transactions.id, id));
        if (!existingTransaction[0]) {
            throw new http_exception_1.HTTPException(404, { message: "Transaction not found" });
        }
        // Authorization middleware has already checked transaction access
        // If updating items, validate them
        if (data.items) {
            let totalAmount = 0;
            for (const item of data.items) {
                const product = await database_1.db
                    .select({
                    id: products_1.products.id,
                    name: products_1.products.name,
                    storeId: products_1.products.storeId,
                    quantity: products_1.products.quantity,
                    storeOwnerId: stores_1.stores.ownerId,
                })
                    .from(products_1.products)
                    .innerJoin(stores_1.stores, (0, drizzle_orm_1.eq)(products_1.products.storeId, stores_1.stores.id))
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(products_1.products.id, item.productId), (0, drizzle_orm_1.isNull)(products_1.products.deletedAt)));
                if (!product[0]) {
                    throw new http_exception_1.HTTPException(404, { message: `Product ${item.productId} not found` });
                }
                // Check if user can access this product
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
                totalAmount += item.amount;
            }
            // Delete existing items
            await database_1.db
                .delete(transactions_1.transactionItems)
                .where((0, drizzle_orm_1.eq)(transactions_1.transactionItems.transactionId, id));
            // Insert new items
            const itemsToInsert = data.items.map(item => ({
                id: (0, crypto_1.randomUUID)(),
                transactionId: id,
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                amount: item.amount,
                createdAt: new Date(),
            }));
            await database_1.db.insert(transactions_1.transactionItems).values(itemsToInsert);
        }
        // Prepare update data
        const updateData = {};
        if (data.photoProofUrl !== undefined)
            updateData.photoProofUrl = data.photoProofUrl;
        if (data.transferProofUrl !== undefined)
            updateData.transferProofUrl = data.transferProofUrl;
        if (data.to !== undefined)
            updateData.to = data.to;
        if (data.customerPhone !== undefined)
            updateData.customerPhone = data.customerPhone;
        if (data.isFinished !== undefined)
            updateData.isFinished = data.isFinished;
        // Update amount if items were updated
        if (data.items) {
            const totalAmount = data.items.reduce((sum, item) => sum + item.amount, 0);
            updateData.amount = totalAmount;
        }
        // Update transaction
        const updatedTransaction = await database_1.db
            .update(transactions_1.transactions)
            .set(updateData)
            .where((0, drizzle_orm_1.eq)(transactions_1.transactions.id, id))
            .returning();
        if (!updatedTransaction[0]) {
            throw new http_exception_1.HTTPException(500, { message: "Failed to update transaction" });
        }
        // Get updated items
        const items = await database_1.db
            .select()
            .from(transactions_1.transactionItems)
            .where((0, drizzle_orm_1.eq)(transactions_1.transactionItems.transactionId, id));
        return {
            id: updatedTransaction[0].id,
            type: updatedTransaction[0].type,
            createdBy: updatedTransaction[0].createdBy,
            approvedBy: updatedTransaction[0].approvedBy,
            fromStoreId: updatedTransaction[0].fromStoreId,
            toStoreId: updatedTransaction[0].toStoreId,
            photoProofUrl: updatedTransaction[0].photoProofUrl,
            transferProofUrl: updatedTransaction[0].transferProofUrl,
            to: updatedTransaction[0].to,
            customerPhone: updatedTransaction[0].customerPhone,
            amount: updatedTransaction[0].amount,
            isFinished: updatedTransaction[0].isFinished,
            createdAt: updatedTransaction[0].createdAt,
            items: items.map(item => ({
                id: item.id,
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                amount: item.amount,
                createdAt: item.createdAt,
            })),
        };
    }
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map