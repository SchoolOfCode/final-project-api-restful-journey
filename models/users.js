import db from "../db/connection.js";

export async function getAllUsers() {
  const result = await db.query(`SELECT * FROM users;`);
  return result.rows;
}

export async function addUser(username, email, favourites, list) {
  const result = await db.query(
    `INSERT INTO users (username, email, favourites, list) SELECT $1, $2, $3, $4 WHERE NOT EXISTS (SELECT $2 FROM users WHERE email=$2) RETURNING *;`,
    [username, email, favourites, list]
  );
  return result.rows;
}

export async function addListItem(email, item) {
  const data = await db.query(
    `UPDATE users SET list = array_append(list, $1) WHERE email= $2 RETURNING *;`,
    [item, email]
  );
  return data.rows;
}

export async function deleteListItem(email, item) {
  const data = await db.query(
    `UPDATE users SET list = array_remove(list, $1) WHERE email = $2 RETURNING list;`,
    [item, email]
  );
  return data.rows;
}

export async function getAllUsersItems(email) {
  const result = await db.query(`SELECT list FROM users WHERE email = $1;`, [
    email,
  ]);
  return result.rows;
}

//get favourite recipes
export async function getAllRecipes(email) {
  const data = await db.query(`SELECT favourites FROM users WHERE email = $1;`, [email]);
  return data.rows;
}


//add new recipe to favourites
export async function addRecipe(recipe, email) {
  const data = await db.query(
    `UPDATE users SET favourites = favourites || $1 ::jsonb WHERE email= $2 RETURNING *;`,
    [recipe, email]
  );
  return data.rows;
}

//delete recipe from favourite

export async function deleteRecipe(recipeIndex, email) {
  const beforeQuery = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
  console.log('beforeQuery', beforeQuery.rows);
  const data = await db.query(
    `UPDATE users SET favourites = favourites - $1 ::INTEGER WHERE email= $2 RETURNING *;`,
    [recipeIndex, email]
  );
  const afterQuery = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
  console.log('afterQuery', afterQuery.rows);
  return data.rows;
}


// const data = await db.query(
//   `UPDATE shopping_list SET list = array_remove(list, $1) WHERE username = $2;`,
//   [item, username]
// );