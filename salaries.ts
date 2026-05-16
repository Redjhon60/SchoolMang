import { pgTable, text, serial, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const salariesTable = pgTable("salaries", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  month: text("month").notNull(),
  date: text("date").notNull(),
  type: text("type").notNull().default("salary"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSalarySchema = createInsertSchema(salariesTable).omit({ id: true, createdAt: true });
export type InsertSalary = z.infer<typeof insertSalarySchema>;
export type Salary = typeof salariesTable.$inferSelect;
