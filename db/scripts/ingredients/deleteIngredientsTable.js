import db from "../../connection.js";

const response = await db.query(`DROP TABLE IF EXISTS ingredients;`);

console.log(`ingredients table deleted`, response);

db.end();
