import {mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const UserSchema = mysqlTable("User", {
    id: varchar("id", { length: 255 }).primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }),
    phone: varchar("phone", { length: 255 }),
})


