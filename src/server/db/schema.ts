// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `Hive_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const users = createTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }),
  email: varchar("email", { length: 120 }).unique(),
  dateOfBirth: timestamp("date_of_birth", { mode: "string" }),
  username: varchar("username", { length: 30 }).unique(),
  password: varchar("password", { length: 256 }),
  imageUrl: varchar("image_url", { length: 256 }),
  isVerified: boolean("is_verified").default(false),
});

export const verificationCode = createTable("verification_code", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 16 }),
  email: varchar("email", { length: 120 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
