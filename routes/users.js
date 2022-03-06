import express from 'express';
import {
  getAllUsers,
  addUser,
  addListItem,
  deleteListItem,
  getAllUsersItems,
} from '../models/users.js';

const router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await getAllUsers();
  res.status(200);
  res.json({
    success: true,
    payload: users,
  });
});

router.post('/', async function (req, res, next) {
  if (!req.body.email) {
    res.status(400).json('user must have an email');
    return;
  }
  const { username, email, favourites, list } = req.body; // add empty array to req body on front end?
  const newUser = await addUser(username, email, favourites, list);
  res.status(201);
  res.json({ success: true, payload: newUser });
});

router.post('/add', async function (req, res, next) {
  console.log('body', req.body);
  const { email, item } = req.body;

  const shoppingList = await addListItem(email, item);
  res.status(201);
  res.json({
    success: true,
    payload: shoppingList,
  });
});

router.delete('/delete', async function (req, res, next) {
  const { email, item } = req.body;
  const deletedItem = await deleteListItem(email, item);
  res.status(200);
  res.json({
    success: true,
    payload: deletedItem,
  });
});

router.get('/list/:id', async function (req, res, next) {
  const email = req.params.id;
  const list = await getAllUsersItems(email);
  res.status(200);
  res.json({
    success: true,
    payload: list,
  });
});

export default router;
