import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Add timestamp to submission
      const submission = {
        ...validatedData,
        createdAt: new Date().toISOString(),
      };
      
      // Store contact submission
      const result = await storage.createContactSubmission(submission);
      
      return res.status(201).json({
        success: true,
        message: "Pesan berhasil dikirim! Kami akan menghubungi Anda secepatnya.",
        submission: result
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "Terjadi kesalahan saat mengirimkan pesan",
        error: error.message
      });
    }
  });

  // Coverage check endpoint - simplified version that returns mock data
  app.get("/api/coverage/check", (req, res) => {
    const { province, city, district, postalCode } = req.query;
    
    if (!province || !postalCode) {
      return res.status(400).json({
        success: false,
        message: "Provinsi dan kode pos diperlukan"
      });
    }
    
    // Generate a consistent result based on the postal code
    // This ensures the same area always returns the same coverage status
    const postalCodeSum = String(postalCode).split('').reduce(
      (sum, digit) => sum + parseInt(digit || '0'), 0
    );
    
    const coverageStatus = postalCodeSum % 3;
    
    let result;
    
    switch(coverageStatus) {
      case 0:
        result = {
          status: "available",
          message: "Layanan tersedia di area Anda."
        };
        break;
      case 1:
        result = {
          status: "partial",
          message: "Layanan mungkin tersedia di area Anda, tetapi perlu dilakukan survei lokasi terlebih dahulu."
        };
        break;
      case 2:
        result = {
          status: "unavailable",
          message: "Mohon maaf, layanan belum tersedia di area Anda. Kami akan menghubungi Anda ketika layanan sudah tersedia."
        };
        break;
    }
    
    return res.json({
      success: true,
      coverage: result
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
