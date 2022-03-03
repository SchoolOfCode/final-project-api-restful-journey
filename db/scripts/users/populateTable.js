import db from "../../connection.js";

const response = await db.query(
  `INSERT INTO users (username, email, favourites) VALUES ($1, $2, $3);`,
  ["Luis", "luiscvrodrigues@gmail.com", ['Roast peppers', 'Pea Soup']]
);

console.log(response);

db.end();
