import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const busesTable = pgTable("buses", {
  id: serial("id").primaryKey(),
  plateNumber: text("plate_number").notNull().unique(),
  capacity: integer("capacity").notNull().default(30),
  driverName: text("driver_name").notNull(),
  driverPhone: text("driver_phone").notNull(),
  route: text("route").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertBusSchema = createInsertSchema(busesTable).omit({ id: true, createdAt: true });
export type InsertBus = z.infer<typeof insertBusSchema>;
export type Bus = typeof busesTable.$inferSelect;
