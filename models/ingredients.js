import db from '../db/connection.js';

export async function getAllIngredients() {
  const result = await db.query(`SELECT * FROM ingredients;`);
  return result.rows;
}