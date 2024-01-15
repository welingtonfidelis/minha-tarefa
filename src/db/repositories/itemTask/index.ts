import { DB, mockDB } from "../db";
import { ItemTaskFullDB } from "./types";

class ItemTaskDB {
  db: DB;

  constructor() {
    this.db = mockDB;
  }

  create(data: ItemTaskFullDB[]) {
    return this.db.item_tasks.bulkAdd(data);
  }
}

export const itemTaskDB = new ItemTaskDB();

// mockDB.on("populate", async () => {
//   await mockDB.item_tasks.bulkAdd(item_tasks);
// });