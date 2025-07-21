"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUserSchema = exports.insertUserSchema = exports.usersRelations = exports.users = exports.roles = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
const drizzle_orm_1 = require("drizzle-orm");
exports.roles = ["OWNER", "ADMIN", "STAFF", "CASHIER"];
exports.users = (0, sqlite_core_1.sqliteTable)("users", {
    id: (0, sqlite_core_1.text)("id").primaryKey(),
    ownerId: (0, sqlite_core_1.text)("owner_id"),
    name: (0, sqlite_core_1.text)("name").notNull(),
    username: (0, sqlite_core_1.text)("username").notNull().unique(),
    passwordHash: (0, sqlite_core_1.text)("password").notNull(),
    role: (0, sqlite_core_1.text)("role", { enum: exports.roles }).notNull(),
    isActive: (0, sqlite_core_1.integer)("is_active", { mode: "boolean" }).default(true),
    createdAt: (0, sqlite_core_1.integer)("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: (0, sqlite_core_1.integer)("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deletedAt: (0, sqlite_core_1.integer)("deleted_at", { mode: "timestamp" }),
}, (table) => [
    (0, sqlite_core_1.foreignKey)({
        columns: [table.ownerId],
        foreignColumns: [table.id],
        name: "owned_users",
    }),
]);
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ one, many }) => ({
    owner: one(exports.users, {
        fields: [exports.users.ownerId],
        references: [exports.users.id],
        relationName: "owner_users",
    }),
    ownedUsers: many(exports.users, {
        relationName: "owner_users",
    }),
}));
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users);
exports.selectUserSchema = (0, drizzle_zod_1.createSelectSchema)(exports.users);
//# sourceMappingURL=users.js.map