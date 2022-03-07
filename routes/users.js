import express from 'express';
import {
  getAllUsers,
  addUser,
  addListItem,
  deleteListItem,
  getAllUsersItems,
  addRecipe,
  getAllRecipes,
  deleteRecipe
} from '../models/users.js';

const router = express.Router();
// where email read as user id

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

// get Favourite recipes
router.get("/favourites/:id", async function (req, res, next) {
  const email = req.params.id
  console.log(email);
  const recipes = await getAllRecipes(email);
  res.json({success: true, payload: recipes });
});

//add new recipe to favourites 
router.post("/favourites", async function (req, res, next) {
  const { recipe, email } = req.body;
  console.log(req.body)
  const newRecipe = await addRecipe(recipe, email);
  res.json({ success: true, payload: newRecipe});
});

//delete recipe from favourites
router.put('/favourites', async function (req, res, next) {
  const { email, recipeIndex} = req.body;
  const deletedRecipe = await deleteRecipe(recipeIndex, email);
  res.status(200);
  res.json({
    success: true,
    payload: deletedRecipe,
  });
});

export default router;
