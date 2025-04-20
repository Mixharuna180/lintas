import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser, insertUserSchema } from "@shared/schema";
import { z } from "zod";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Extended schema for registration with validation
export const registerSchema = insertUserSchema.extend({
  email: z.string().email({ message: "Email tidak valid" }),
  name: z.string().min(3, { message: "Nama lengkap minimal 3 karakter" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password dan konfirmasi password tidak sama",
  path: ["confirmPassword"],
});

// Schema for login
export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username harus diisi" }),
  password: z.string().min(1, { message: "Password harus diisi" }),
});

export function setupAuth(app: Express) {
  // Ensure we have a SESSION_SECRET
  if (!process.env.SESSION_SECRET) {
    process.env.SESSION_SECRET = randomBytes(32).toString('hex');
    console.warn("WARNING: No SESSION_SECRET set, using a random value which will invalidate existing sessions on restart");
  }

  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Username atau password salah" });
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      // Validate request data
      const result = registerSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validasi data gagal", 
          errors: result.error.format() 
        });
      }

      const { username, email } = result.data;

      // Check if username already exists
      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username sudah digunakan" });
      }

      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }

      // Hash password
      const hashedPassword = await hashPassword(req.body.password);

      // Create user (omitting confirmPassword)
      const { confirmPassword, ...userData } = result.data;
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      // Log in the new user
      req.login(user, (err) => {
        if (err) return next(err);
        
        // Return user data but exclude password
        const { password, ...safeUserData } = user;
        res.status(201).json({ 
          message: "Registrasi berhasil",
          user: safeUserData 
        });
      });

    } catch (error) {
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    // Validate login data
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ 
        message: "Validasi data gagal", 
        errors: result.error.format() 
      });
    }

    passport.authenticate("local", (err: Error | null, user: SelectUser | false, info: { message: string } | undefined) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info?.message || "Login gagal" });
      }
      
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        
        // Return user data but exclude password
        const { password, ...safeUserData } = user;
        res.status(200).json({ 
          message: "Login berhasil",
          user: safeUserData 
        });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({ message: "Logout berhasil" });
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Tidak terautentikasi" });
    }
    
    // Return user data but exclude password
    const { password, ...safeUserData } = req.user as SelectUser;
    res.json(safeUserData);
  });
}