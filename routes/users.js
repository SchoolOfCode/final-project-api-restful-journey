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

export default router;
