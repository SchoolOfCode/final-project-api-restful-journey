import express from "express";
import {
  getAllListItems,
  getListItemByUser,
  addListItem,
} from "../models/shoppingList.js";

const router = express.Router();

/* GET shopping list. */
router.get("/", async function (req, res, next) {
  const shoppingList = await getAllListItems();

  res.json({
    success: true,
    payload: shoppingList,
  });
});

/* GET shopping list by user. */
router.get("/user", async function (req, res, next) {
  const username = req.query.name;
  console.log(username);
  const shoppingList = await getListItemByUser(username);

  res.json({
    success: true,
    payload: shoppingList,
  });
});

/* POST new list item in shopping list. */
router.post("/user/add", async function (req, res, next) {
  const username = req.query.name;
  console.log(username);
  const item = req.body.item;
  console.log(item);
  const shoppingList = await addListItem(username, item);

  res.json({
    success: true,
    payload: shoppingList,
  });
});

export default router;
