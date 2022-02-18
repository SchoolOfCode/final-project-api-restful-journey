import express from "express";
import { getAllIngredients,getAllIngredientsBySeason, getAllIngredientsByMonth } from "../models/ingredients.js";

const router = express.Router();

/* GET ingredients listing. */
router.get("/", async function (req, res, next) {
  const ingredients = await getAllIngredients();

  res.json({
    success: true,
    payload: ingredients
  });
});

router.get("/season/:season", async function (req, res, next) {
  const{season}= req.params
  const ingredients = await getAllIngredientsBySeason(season);

  res.json({
    success: true,
    payload: ingredients
  });
});

router.get("/month/:month", async function (req, res, next) {
  const{month}= req.params
  const ingredients = await getAllIngredientsByMonth(month);

  res.json({
    success: true,
    payload: ingredients
  });
});


export default router;
