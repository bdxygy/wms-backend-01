"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
(0, vitest_1.beforeAll)(async () => {
    // Run migrations before all tests
    // await migrate(db, { migrationsFolder: './drizzle' }); // Adjust path as needed
});
(0, vitest_1.afterAll)(async () => {
    // Clean up after all tests (e.g., close database connection)
    // For libsql, you might not need to explicitly close, but it's good practice
    // if db has a close method.
});
//# sourceMappingURL=setup.js.map