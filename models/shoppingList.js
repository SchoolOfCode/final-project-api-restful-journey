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

// export async function addListItem(username, item) {
//   let string = ``;
//   const result = await db.query(
//     `SELECT list FROM shopping_list WHERE username = $1;`,
//     [username]
//   );
//   console.log(result.rows[0].list);
//   result.rows[0].list.push(item);
//   for (let i = 0; i < result.rows[0].list.length; i++) {
//     string += `${result.rows[0].list[i]}`;
//   }
//   console.log(string);
//   console.log(result);
//   // return result.rows;
//   const data = await db.query(
//     `UPDATE shopping_list SET list = $1 WHERE username= $2 RETURNING *;`,
//     [`{${string}}`, username]
//   );
//   return data;
// }
