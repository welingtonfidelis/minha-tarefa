import { DB, mockDB } from "../db";
import { CreateItemTaskData } from "./types";

class ItemTaskDB {
  db: DB;

  constructor() {
    this.db = mockDB;
  }

  create(data: CreateItemTaskData[]) {
    return this.db.item_tasks.bulkAdd(data as any);
  }

  findById(id: number) {
    return this.db.item_tasks.where('taskId').equals(id);
  }
}

export const itemTaskDB = new ItemTaskDB();

// mockDB.on("populate", async () => {
//   await mockDB.item_tasks.bulkAdd(item_tasks);
// });