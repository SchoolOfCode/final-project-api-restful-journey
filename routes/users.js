import express from "express";
import { getAllUsers, addUser } from "../models/users.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await getAllUsers();

  res.json({
    success: true,
    payload: users,
  });
});

router.post("/", async function (req, res, next) {
  const { username, email, favourites } = req.body;
  const newUser = await addUser(username, email, favourites);
  res.json({ success: true, payload: newUser });
});

router.post("/add", async function (req, res, next) {
  const email = req.query.name;
  console.log(username);
  const item = req.body.item;
  console.log(item);
  const shoppingList = await addListItem(email, item);

  res.json({
    success: true,
    payload: shoppingList,
  });
});

export default router;
