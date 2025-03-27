import express, { Router } from "express";
import {
  register,
  login,
  getCurrentUser,
  updateUser,
} from "../controllers/authController";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

// Route d'inscription
router.post("/register", register);

// Route de connexion
router.post("/login", login);

// Route pour récupérer l'utilisateur actuel (protégée)
router.get("/me", auth, getCurrentUser);

// Route pour mettre à jour les informations de l'utilisateur (protégée)
router.put("/update", auth, updateUser);

export default router;
