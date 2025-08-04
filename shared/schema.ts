import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const nicknames = pgTable("nicknames", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  theme: text("theme").notNull(),
  algorithm: text("algorithm").notNull(),
  language: text("language").notNull().default("en"),
  style: text("style").notNull().default("classic"),
  complexity: text("complexity").notNull().default("medium"),
  length: integer("length").notNull(),
  isFavorite: boolean("is_favorite").default(false),
  copyCount: integer("copy_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const generationHistory = pgTable("generation_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  parameters: jsonb("parameters").notNull(),
  generatedCount: integer("generated_count").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNicknameSchema = createInsertSchema(nicknames).omit({
  id: true,
  createdAt: true,
});

export const insertGenerationHistorySchema = createInsertSchema(generationHistory).omit({
  id: true,
  createdAt: true,
});

export const nicknameThemes = z.enum([
  "fantasy",
  "sci-fi", 
  "military",
  "cute",
  "edgy",
  "neutral"
]);

export const generationAlgorithms = z.enum([
  "random",
  "syllabic",
  "thematic"
]);

export const supportedLanguages = z.enum([
  "en",
  "pt-br",
  "es", 
  "fr",
  "de",
  "it"
]);

export const complexityLevels = z.enum([
  "simple",
  "medium", 
  "complex"
]);

export const nicknameStyles = z.enum([
  "classic",
  "modern",
  "unique",
  "professional"
]);

export const generationParameters = z.object({
  algorithm: generationAlgorithms,
  theme: nicknameThemes,
  language: supportedLanguages.default("en"),
  minLength: z.number().min(3).max(20),
  maxLength: z.number().min(4).max(20),
  includeNumbers: z.boolean(),
  includeSpecialChars: z.boolean(),
  useCapitalization: z.boolean(),
  complexity: complexityLevels.default("medium"),
  style: nicknameStyles.default("classic"),
  avoidCommonWords: z.boolean().default(false),
  preferShortWords: z.boolean().default(false),
  count: z.number().min(1).max(50).default(24),
});

export type InsertNickname = z.infer<typeof insertNicknameSchema>;
export type Nickname = typeof nicknames.$inferSelect;
export type InsertGenerationHistory = z.infer<typeof insertGenerationHistorySchema>;
export type GenerationHistory = typeof generationHistory.$inferSelect;
export type NicknameTheme = z.infer<typeof nicknameThemes>;
export type GenerationAlgorithm = z.infer<typeof generationAlgorithms>;
export type SupportedLanguage = z.infer<typeof supportedLanguages>;
export type ComplexityLevel = z.infer<typeof complexityLevels>;
export type NicknameStyle = z.infer<typeof nicknameStyles>;
export type GenerationParameters = z.infer<typeof generationParameters>;
