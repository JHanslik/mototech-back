import express, { Router } from "express";
import { getUserOrders, createOrder } from "../controllers/orderController";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

// Route pour récupérer les commandes de l'utilisateur (protégée)
router.get("/user", auth, getUserOrders);

// Route pour créer une nouvelle commande (protégée)
router.post("/", auth, createOrder);

export default router;
