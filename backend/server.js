// import express from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import productRoute from "./route/product.route.js";
// import cors from "cors";

// // Enable CORS for all origins

// dotenv.config();
// const app = express();
// app.use(cors());

// app.use(express.json()); // Allow JSON in request body

// app.use("/api/products", productRoute);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   connectDB();
//   console.log("Server started at http://localhost:" + PORT);
// });

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./route/product.route.js";
import cors from "cors";

dotenv.config();

const app = express();

// Connect to database
connectDB();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*", // Replace with your frontend URL in production
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Product route
app.use("/api/products", productRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit();
});
