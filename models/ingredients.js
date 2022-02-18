import db from '../db/connection.js';

export async function getAllIngredients() {
  const result = await db.query(`SELECT * FROM ingredients;`);
  return result.rows;
}

export async function getIngredientsBySeason(seasonInput) {
  const result = await db.query(`SELECT * FROM ingredients WHERE seasonInput = $1 = ANY(season);`, [seasonInput]);
  return result.rows;
}
export async function getIngredientsByMonth(monthInput) {
  const result = await db.query(`SELECT * FROM ingredients WHERE monthInput = $1 = ANY(months);`, [monthInput]);
  return result.rows;
}