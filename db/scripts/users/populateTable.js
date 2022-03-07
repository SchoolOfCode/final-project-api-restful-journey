import db from '../../connection.js';

const response = await db.query(
  `INSERT INTO users (username, email, favourites, list) VALUES ($1, $2, $3, $4);`,
  [
    'Tony',
    '123',
    '[{ "id": 2, "name": "Roast Peppers", "time": 45}, { "id": 3, "name": "Pea Soup", "time": 30}]',
    ['onion', 'carrot'],
  ]
);

console.log(response);

db.end();
