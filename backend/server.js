import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./route/product.route.js";
import cors from "cors";

// Enable CORS for all origins

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json()); // Allow JSON in request body

app.use("/api/products", productRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
