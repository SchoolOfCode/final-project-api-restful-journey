import db from "../../connection.js";

const response = await db.query(
  `CREATE TABLE IF NOT EXISTS ingredients (id SERIAL PRIMARY KEY, name TEXT, imgUrl TEXT, isfruit BOOLEAN, season TEXT[], months INTEGER[],
    nutrition TEXT, fact TEXT);`
);

console.log(`ingredients table created`, response);

db.end();