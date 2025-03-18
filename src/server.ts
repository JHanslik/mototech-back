import express, { Request, Response, RequestHandler } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Product from "./models/Product";
import User from "./models/User";
import Order from "./models/Order";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API");
});

// Routes
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Routes pour un produit spécifique
app.get(
  "/api/products/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).json({ error: "Produit non trouvé" });
        return;
      }
      res.json(product);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Routes pour modifier et supprimer un produit
app
  .route("/api/products/:id")
  .put((req: Request, res: Response) => {
    try {
      Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .then((product) => {
          if (!product)
            return res.status(404).json({ error: "Product not found" });
          res.json(product);
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  })
  .delete((req: Request, res: Response) => {
    try {
      Product.findByIdAndDelete(req.params.id)
        .then((product) => {
          if (!product)
            return res.status(404).json({ error: "Product not found" });
          res.json({ message: "Product deleted" });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/orders", async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/orders", async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
