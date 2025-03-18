import mongoose from "mongoose";
import Product from "../models/Product";
import User from "../models/User";

const seedProducts = [
  {
    name: "Casque Intelligent ConnectRide",
    price: 299.99,
    description:
      "Casque de moto avec Bluetooth, GPS intégré et système de communication mains libres. Compatible avec Android et iOS.",
    category: "casques",
    stock: 15,
  },
  {
    name: "GPS MotoNav Pro",
    price: 199.99,
    description:
      "Système de navigation GPS spécialement conçu pour les motards. Écran résistant aux intempéries et gants tactiles.",
    category: "navigation",
    stock: 20,
  },
  {
    name: "Caméra MotoVision 4K",
    price: 149.99,
    description:
      "Caméra d'action 4K fixable sur casque ou moto pour enregistrer vos trajets en haute définition.",
    category: "accessoires",
    stock: 30,
  },
  {
    name: "Intercom MotoCom Duo",
    price: 129.99,
    description:
      "Système de communication intégrable à votre casque pour communiquer jusqu'à 1km avec d'autres motards.",
    category: "accessoires",
    stock: 18,
  },
  {
    name: "Gants Chauffants Smart",
    price: 89.99,
    description:
      "Gants chauffants avec contrôle de température via smartphone. Batterie longue durée incluse.",
    category: "accessoires",
    stock: 22,
  },
  {
    name: "Veste Connectée ProRider",
    price: 249.99,
    description:
      "Veste moto avec LED intégrées pour la signalisation et airbag électronique en cas de chute.",
    category: "accessoires",
    stock: 10,
  },
];

const seedUsers = [
  {
    username: "testuser",
    email: "test@example.com",
    password: "password123",
  },
];

const seedDatabase = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("MongoDB connecté");

    // Supprimer les données existantes
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log("Base de données nettoyée");

    // Insérer les nouvelles données
    await Product.insertMany(seedProducts);
    await User.insertMany(seedUsers);
    console.log("Données de test insérées avec succès");

    // Déconnexion
    await mongoose.disconnect();
    console.log("MongoDB déconnecté");

    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de l'insertion des données:", error);
    process.exit(1);
  }
};

// Exécuter la fonction
seedDatabase();
