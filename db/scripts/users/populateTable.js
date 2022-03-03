import db from '../../connection.js';

const response = await db.query(
  `INSERT INTO users (username, email, favourites, list) VALUES ($1, $2, $3, $4);`,
  [
    'Luis',
    'luiscvrodrigues@gmail.com',
    ['Roast peppers', 'Pea Soup'],
    ['onion', 'carrot'],
  ]
);

console.log(response);

db.end();
