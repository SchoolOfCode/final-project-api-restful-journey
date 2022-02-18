import db from "../../connection.js";
import { shoppingList } from "../../../libs/shoppingListData.js";

async function populateShoppingListTable() {
  for (let i = 0; i < shoppingList.length; i++) {
    const username = shoppingList[i].username;
    const list = shoppingList[i].list;

    const response = await db.query(
      `INSERT INTO shopping_list (username, list) VALUES ($1, $2);`,
      [username, list]
    );

    console.log("Shopping list table is populated!", response);
  }
  db.end();
}

populateShoppingListTable();
