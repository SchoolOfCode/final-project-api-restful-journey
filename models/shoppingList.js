import db from "../db/connection.js";

export async function getAllListItems() {
  const result = await db.query(`SELECT * FROM shopping_list;`);
  return result.rows;
}

export async function getListItemByUser(username) {
  const result = await db.query(
    `SELECT * FROM shopping_list WHERE username = $1;`,
    [username]
  );
  return result.rows;
}

// addListItem function in progress

export async function addListItem(username, item) {
  const data = await db.query(
    `UPDATE shopping_list SET list = array_append(list, $1) WHERE username= $2 RETURNING *;`,
    [item, username]
  );
  return data;
}

// deleteListItem function

export async function deleteListItem(username, item) {
  const data = await db.query(
    `UPDATE shopping_list SET list = array_remove(list, $1) WHERE username = $2;`,
    [item, username]
  );
  return data;
}
