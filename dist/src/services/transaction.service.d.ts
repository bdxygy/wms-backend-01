import type { CreateTransactionRequest, UpdateTransactionRequest, ListTransactionsQuery } from "../schemas/transaction.schemas";
import type { User } from "../models/users";
export declare class TransactionService {
    static createTransaction(data: CreateTransactionRequest, createdBy: User): Promise<{
        id: string;
        type: "SALE" | "TRANSFER";
        createdBy: string | null;
        approvedBy: string | null;
        fromStoreId: string | null;
        toStoreId: string | null;
        photoProofUrl: string | null;
        transferProofUrl: string | null;
        to: string | null;
        customerPhone: string | null;
        amount: number | null;
        isFinished: boolean | null;
        createdAt: Date;
        items: {
            id: string;
            productId: string;
            name: string;
            price: number;
            quantity: number;
            amount: number | null;
            createdAt: Date;
        }[];
    }>;
    static getTransactionById(id: string): Promise<{
        id: string;
        type: "SALE" | "TRANSFER";
        createdBy: string | null;
        approvedBy: string | null;
        fromStoreId: string | null;
        toStoreId: string | null;
        photoProofUrl: string | null;
        transferProofUrl: string | null;
        to: string | null;
        customerPhone: string | null;
        amount: number | null;
        isFinished: boolean | null;
        createdAt: Date;
        items: {
            id: string;
            productId: string;
            name: string;
            price: number;
            quantity: number;
            amount: number | null;
            createdAt: Date;
        }[];
    }>;
    static listTransactions(query: ListTransactionsQuery, requestingUser: User): Promise<{
        transactions: {
            id: string;
            type: "SALE" | "TRANSFER";
            createdBy: string | null;
            approvedBy: string | null;
            fromStoreId: string | null;
            toStoreId: string | null;
            photoProofUrl: string | null;
            transferProofUrl: string | null;
            to: string | null;
            customerPhone: string | null;
            amount: number | null;
            isFinished: boolean | null;
            createdAt: Date;
            items: {
                id: string;
                productId: string;
                name: string;
                price: number;
                quantity: number;
                amount: number | null;
                createdAt: Date;
            }[];
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    static updateTransaction(id: string, data: UpdateTransactionRequest, requestingUser: User): Promise<{
        id: string;
        type: "SALE" | "TRANSFER";
        createdBy: string | null;
        approvedBy: string | null;
        fromStoreId: string | null;
        toStoreId: string | null;
        photoProofUrl: string | null;
        transferProofUrl: string | null;
        to: string | null;
        customerPhone: string | null;
        amount: number | null;
        isFinished: boolean | null;
        createdAt: Date;
        items: {
            id: string;
            productId: string;
            name: string;
            price: number;
            quantity: number;
            amount: number | null;
            createdAt: Date;
        }[];
    }>;
}
//# sourceMappingURL=transaction.service.d.ts.map