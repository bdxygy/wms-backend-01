export declare const categories: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "categories";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "id";
            tableName: "categories";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        storeId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "store_id";
            tableName: "categories";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        name: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "name";
            tableName: "categories";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        createdBy: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "created_by";
            tableName: "categories";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "created_at";
            tableName: "categories";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "updated_at";
            tableName: "categories";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deletedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "deleted_at";
            tableName: "categories";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
export declare const categoriesRelations: import("drizzle-orm").Relations<"categories", {
    store: import("drizzle-orm").One<"stores", true>;
    createdByUser: import("drizzle-orm").One<"users", true>;
}>;
export declare const insertCategorySchema: import("drizzle-zod").BuildSchema<"insert", {
    id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "id";
        tableName: "categories";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    storeId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "store_id";
        tableName: "categories";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    name: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "name";
        tableName: "categories";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    createdBy: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "created_by";
        tableName: "categories";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "created_at";
        tableName: "categories";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: true;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "updated_at";
        tableName: "categories";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: true;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    deletedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "deleted_at";
        tableName: "categories";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
}, undefined, undefined>;
export declare const selectCategorySchema: import("drizzle-zod").BuildSchema<"select", {
    id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "id";
        tableName: "categories";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    storeId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "store_id";
        tableName: "categories";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    name: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "name";
        tableName: "categories";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    createdBy: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "created_by";
        tableName: "categories";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "created_at";
        tableName: "categories";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: true;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "updated_at";
        tableName: "categories";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: true;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    deletedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "deleted_at";
        tableName: "categories";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
}, undefined, undefined>;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
//# sourceMappingURL=categories.d.ts.map