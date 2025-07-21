export type DatabaseType = "better-sqlite3" | "libsql";
declare const db: import("drizzle-orm/libsql").LibSQLDatabase<Record<string, unknown>> & {
    $client: import("@libsql/client/.").Client;
}, type: "libsql";
export { db, type as dbType };
export declare function getDatabaseInstance(): import("drizzle-orm/libsql").LibSQLDatabase<Record<string, unknown>> & {
    $client: import("@libsql/client/.").Client;
};
export declare function getDatabaseType(): DatabaseType;
//# sourceMappingURL=database.d.ts.map