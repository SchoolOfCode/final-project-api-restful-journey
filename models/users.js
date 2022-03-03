import db from "../db/connection.js";

export async function getAllUsers() {
  const result = await db.query(`SELECT * FROM users;`);
  return result.rows;
}

export async function addUser(username, email, favourites) {
  const result = await db.query(
    `INSERT INTO users (username, email, favourites) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT $2 FROM users WHERE email=$2) RETURNING username, email, favourites;`,
    [username, email, favourites]
  );
  return result.rows;
}

export async function addListItem(email, item) {
  const data = await db.query(
    `UPDATE users SET list = array_append(list, $1) WHERE email= $2 RETURNING *;`,
    [item, email]
  );
  return data;
}

// deleteListItem function

// export async function deleteListItem(username, item) {
//   const data = await db.query(
//     `UPDATE shopping_list SET list = array_remove(list, $1) WHERE username = $2;`,
//     [item, username]
//   );
//   return data;
// }
