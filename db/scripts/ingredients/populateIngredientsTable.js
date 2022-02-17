import db from "../../connection.js";
import {ingredients} from '../../../libs/ingredientsData.js';

async function populateIngredientsTable() {
  for (let i = 0; i < ingredients.length; i++) {
    const name = ingredients[i].name;
    const imgUrl = ingredients[i].imgUrl;
    const isFruit = ingredients[i].isFruit;
    const season = ingredients[i].season;
    const months = ingredients[i].months;
    const nutrition = ingredients[i].nutrition;
    const fact = ingredients[i].fact;

    const response = await db.query(
        `INSERT INTO ingredients (name, imgUrl, isFruit, season, months, nutrition, fact) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [name, imgUrl , isFruit, season, months, nutrition, fact]
      );
      
    console.log("ingredients table is populated!", response);
    }
    db.end();
}
populateIngredientsTable();




