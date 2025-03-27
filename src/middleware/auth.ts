import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "votre_secret_jwt"; // À déplacer dans les variables d'environnement en production

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  // Récupérer le token du header Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Accès refusé, aucun token fourni" });
    return;
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Ajouter l'utilisateur à la requête
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};
