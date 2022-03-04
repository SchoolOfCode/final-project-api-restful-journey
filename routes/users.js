import express from "express";
import {
  getAllUsers,
  addUser,
  addListItem,
  deleteListItem,
  getAllUsersItems,
} from "../models/users.js";

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
  const { username, email, favourites, list } = req.body; // add empty array to req body on front end?
  const newUser = await addUser(username, email, favourites, list);
  res.json({ success: true, payload: newUser });
});

router.post("/add", async function (req, res, next) {
  console.log("body", req.body);
  const { email, item } = req.body;

  const shoppingList = await addListItem(email, item);

  res.json({
    success: true,
    payload: shoppingList,
  });
});

router.delete("/delete", async function (req, res, next) {
  const { email, item } = req.body;
  const deletedItem = await deleteListItem(email, item);
  res.json({
    success: true,
    payload: deletedItem,
  });
});

router.get("/list/:id", async function (req, res, next) {
  console.log('route ',req.params)
  const email = req.params.id;
  const list = await getAllUsersItems(email);
  res.json({
    success: true,
    payload: list,
  });
});

export default router;
