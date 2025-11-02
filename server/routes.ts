import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { CountryDisplay } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/random-country", async (req, res) => {
    try {
      const country = await storage.getRandomCountry();
      res.json(country);
    } catch (error) {
      console.error("Error fetching random country:", error);
      res.status(500).json({ error: "Failed to fetch country data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
