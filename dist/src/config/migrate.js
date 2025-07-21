"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const migrator_1 = require("drizzle-orm/libsql/migrator");
const database_1 = require("./database");
async function main() {
    try {
        console.log("Starting database migration...");
        // For libsql/Turso
        await (0, migrator_1.migrate)(database_1.db, {
            migrationsFolder: "./drizzle",
        });
        console.log("Database migration completed successfully");
    }
    catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}
main().catch((error) => {
    console.error("Migration error:", error);
    process.exit(1);
});
//# sourceMappingURL=migrate.js.map