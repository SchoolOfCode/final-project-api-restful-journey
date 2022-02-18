import db from "../../connection.js";

const response = await db.query(
  `CREATE TABLE IF NOT EXISTS shopping_list (id SERIAL PRIMARY KEY, username TEXT, list TEXT[]);`
);

console.log(`Shopping list table created`, response);

db.end();
