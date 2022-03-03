import { user } from "pg/lib/defaults";
import db from "../db/connection.js";

export async function getAllUsers() {
  const result = await db.query(`SELECT * FROM users;`);
  return result.rows;
}

// export async function addUser(username, email, favourites) {
//   const result = await db.query(
//     `INSERT INTO users (username, email, favourites) VALUES ($1, $2, $3) RETURNING username, email, favourites;`,
//     [username, email, favourites]
//   );
//   return result.rows;
// }

export async function addUser(username, email, favourites) {
  const result = await db.query(
    `INSERT INTO users (username, email, favourites) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT $2 FROM table WHERE email=$2) RETURNING username, email, favourites;`,
    [username, email, favourites]
  );
  return result.rows;
}
