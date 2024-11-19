import express from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.get("/", getProduct);

router.put("/:id", updateProduct);

export default router;
