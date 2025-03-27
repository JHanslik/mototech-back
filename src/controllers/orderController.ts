import { Request, Response } from "express";
import Order from "../models/Order";

export const getUserOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    // Récupérer toutes les commandes de l'utilisateur avec les détails des produits
    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { items, totalAmount } = req.body;
    const userId = (req as any).user.id;

    // Vérifier que items est un tableau non vide
    if (!Array.isArray(items) || items.length === 0) {
      res
        .status(400)
        .json({ message: "La commande doit contenir au moins un produit" });
      return;
    }

    const newOrder = new Order({
      items,
      totalAmount,
      userId,
      status: "pending",
    });

    await newOrder.save();

    res.status(201).json({
      message: "Commande créée avec succès",
      order: newOrder,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
