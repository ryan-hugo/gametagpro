import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNicknameSchema, insertGenerationHistorySchema, generationParameters } from "@shared/schema";
import { generateNicknames } from "../client/src/lib/nickname-generator-v2";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate nicknames
  app.post("/api/nicknames/generate", async (req, res) => {
    try {
      const params = generationParameters.parse(req.body);
      const sessionId = req.headers["x-session-id"] as string || "default";
      
      // Generate nicknames using the algorithm
      const generatedNames = generateNicknames(params);
      
      // Save each nickname to storage
      const nicknames = await Promise.all(
        generatedNames.map(name => 
          storage.createNickname({
            name,
            theme: params.theme,
            algorithm: params.algorithm,
            language: params.language || "en",
            style: params.style || "classic",
            complexity: params.complexity || "medium",
            length: name.length,
            isFavorite: false,
            copyCount: 0,
          })
        )
      );

      // Save generation history
      await storage.createGenerationHistory({
        sessionId,
        parameters: params,
        generatedCount: nicknames.length,
      });

      res.json(nicknames);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get nicknames with pagination
  app.get("/api/nicknames", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 24;
      const offset = parseInt(req.query.offset as string) || 0;
      const search = req.query.search as string;

      let nicknames;
      if (search) {
        nicknames = await storage.searchNicknames(search);
        nicknames = nicknames.slice(offset, offset + limit);
      } else {
        nicknames = await storage.getNicknames(limit, offset);
      }

      res.json(nicknames);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get favorite nicknames
  app.get("/api/nicknames/favorites", async (req, res) => {
    try {
      const favorites = await storage.getFavoriteNicknames();
      res.json(favorites);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Toggle favorite status
  app.post("/api/nicknames/:id/favorite", async (req, res) => {
    try {
      const nickname = await storage.toggleFavorite(req.params.id);
      if (!nickname) {
        return res.status(404).json({ message: "Nickname not found" });
      }
      res.json(nickname);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Increment copy count
  app.post("/api/nicknames/:id/copy", async (req, res) => {
    try {
      const nickname = await storage.incrementCopyCount(req.params.id);
      if (!nickname) {
        return res.status(404).json({ message: "Nickname not found" });
      }
      res.json(nickname);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get generation statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const sessionId = req.headers["x-session-id"] as string || "default";
      const stats = await storage.getGenerationStats(sessionId);
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
