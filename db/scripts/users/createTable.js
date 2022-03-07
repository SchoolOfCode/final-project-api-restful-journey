import db from '../../connection.js';

const response = await db.query(
  `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT, email TEXT, favourites jsonb, list TEXT[]);`
);

console.log(response);

db.end();
