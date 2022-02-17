import express from "express";
import { getAllIngredients } from "../models/ingredients.js";

const router = express.Router();

/* GET ingredients listing. */
router.get("/", async function (req, res, next) {
  const ingredients = await getAllIngredients();

  res.json({
    success: true,
    payload: ingredients
  });
});

export default router;
