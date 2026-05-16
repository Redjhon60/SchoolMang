import { pgTable, text, serial, numeric, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const settingsTable = pgTable("settings", {
  id: serial("id").primaryKey(),
  schoolName: text("school_name").notNull().default("Mon École"),
  address: text("address").notNull().default("Casablanca, Maroc"),
  phone: text("phone").notNull().default("0522000000"),
  email: text("email"),
  logo: text("logo"),
  currency: text("currency").notNull().default("MAD"),
  academicYear: text("academic_year").notNull().default("2025-2026"),
  defaultMonthlyFee: numeric("default_monthly_fee", { precision: 10, scale: 2 }).notNull().default("1200"),
  defaultTransportFee: numeric("default_transport_fee", { precision: 10, scale: 2 }).notNull().default("300"),
  defaultInsuranceFee: numeric("default_insurance_fee", { precision: 10, scale: 2 }).notNull().default("150"),
  theme: text("theme").notNull().default("light"),
  language: text("language").notNull().default("fr"),
  autoBackup: boolean("auto_backup").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertSettingsSchema = createInsertSchema(settingsTable).omit({ id: true, updatedAt: true });
export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settingsTable.$inferSelect;
