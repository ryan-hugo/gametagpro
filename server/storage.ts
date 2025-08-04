import { type Nickname, type InsertNickname, type GenerationHistory, type InsertGenerationHistory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Nickname operations
  createNickname(nickname: InsertNickname): Promise<Nickname>;
  getNicknames(limit?: number, offset?: number): Promise<Nickname[]>;
  getFavoriteNicknames(): Promise<Nickname[]>;
  toggleFavorite(id: string): Promise<Nickname | undefined>;
  incrementCopyCount(id: string): Promise<Nickname | undefined>;
  searchNicknames(query: string): Promise<Nickname[]>;
  
  // Generation history operations
  createGenerationHistory(history: InsertGenerationHistory): Promise<GenerationHistory>;
  getGenerationStats(sessionId: string): Promise<{
    generatedToday: number;
    totalFavorites: number;
    totalCopied: number;
  }>;
}

export class MemStorage implements IStorage {
  private nicknames: Map<string, Nickname>;
  private generationHistory: Map<string, GenerationHistory>;

  constructor() {
    this.nicknames = new Map();
    this.generationHistory = new Map();
  }

  async createNickname(insertNickname: InsertNickname): Promise<Nickname> {
    const id = randomUUID();
    const nickname: Nickname = {
      ...insertNickname,
      id,
      isFavorite: insertNickname.isFavorite ?? false,
      copyCount: insertNickname.copyCount ?? 0,
      createdAt: new Date(),
    };
    this.nicknames.set(id, nickname);
    return nickname;
  }

  async getNicknames(limit = 50, offset = 0): Promise<Nickname[]> {
    const allNicknames = Array.from(this.nicknames.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    return allNicknames.slice(offset, offset + limit);
  }

  async getFavoriteNicknames(): Promise<Nickname[]> {
    return Array.from(this.nicknames.values())
      .filter(nickname => nickname.isFavorite)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async toggleFavorite(id: string): Promise<Nickname | undefined> {
    const nickname = this.nicknames.get(id);
    if (!nickname) return undefined;
    
    const updated = { ...nickname, isFavorite: !nickname.isFavorite };
    this.nicknames.set(id, updated);
    return updated;
  }

  async incrementCopyCount(id: string): Promise<Nickname | undefined> {
    const nickname = this.nicknames.get(id);
    if (!nickname) return undefined;
    
    const updated = { ...nickname, copyCount: (nickname.copyCount || 0) + 1 };
    this.nicknames.set(id, updated);
    return updated;
  }

  async searchNicknames(query: string): Promise<Nickname[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.nicknames.values())
      .filter(nickname => 
        nickname.name.toLowerCase().includes(lowercaseQuery) ||
        nickname.theme.toLowerCase().includes(lowercaseQuery)
      )
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createGenerationHistory(insertHistory: InsertGenerationHistory): Promise<GenerationHistory> {
    const id = randomUUID();
    const history: GenerationHistory = {
      ...insertHistory,
      id,
      createdAt: new Date(),
    };
    this.generationHistory.set(id, history);
    return history;
  }

  async getGenerationStats(sessionId: string): Promise<{
    generatedToday: number;
    totalFavorites: number;
    totalCopied: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayHistory = Array.from(this.generationHistory.values())
      .filter(h => h.sessionId === sessionId && new Date(h.createdAt!) >= today);
    
    const generatedToday = todayHistory.reduce((sum, h) => sum + h.generatedCount, 0);
    
    const allNicknames = Array.from(this.nicknames.values());
    const totalFavorites = allNicknames.filter(n => n.isFavorite).length;
    const totalCopied = allNicknames.reduce((sum, n) => sum + (n.copyCount || 0), 0);

    return {
      generatedToday,
      totalFavorites,
      totalCopied,
    };
  }
}

export const storage = new MemStorage();
