import { pgTable, text, serial, integer, boolean, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const studentsTable = pgTable("students", {
  id: serial("id").primaryKey(),
  studentCode: text("student_code").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  gender: text("gender").notNull().default("male"),
  dateOfBirth: text("date_of_birth"),
  address: text("address"),
  parentName: text("parent_name"),
  parentPhone: text("parent_phone"),
  emergencyPhone: text("emergency_phone"),
  photo: text("photo"),
  classId: integer("class_id").notNull(),
  monthlyFee: numeric("monthly_fee", { precision: 10, scale: 2 }).notNull().default("0"),
  hasTransport: boolean("has_transport").notNull().default(false),
  transportFee: numeric("transport_fee", { precision: 10, scale: 2 }),
  insurancePaid: boolean("insurance_paid").notNull().default(false),
  insuranceFee: numeric("insurance_fee", { precision: 10, scale: 2 }),
  notes: text("notes"),
  registrationDate: text("registration_date").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertStudentSchema = createInsertSchema(studentsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof studentsTable.$inferSelect;
