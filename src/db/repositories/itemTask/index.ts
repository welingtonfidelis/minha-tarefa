import { DB, mockDB } from "../db";
import { CreateItemTaskData, UpdateItemTaskData } from "./types";

class ItemTaskDB {
  db: DB;

  constructor() {
    this.db = mockDB;
  }

  create(data: CreateItemTaskData[]) {
    return this.db.item_tasks.bulkAdd(data as any);
  }

  findByTaskId(id: number) {
    return this.db.item_tasks.where("taskId").equals(id).toArray();
  }

  update(data: UpdateItemTaskData) {
    const { id, ...rest } = data;

    return this.db.item_tasks.update(id, rest);
  }

  async updateCheckedByTaskId(id: number, checked: 1 | 0) {
    const items = await this.db.item_tasks.where('taskId').equals(id).toArray();

    if (!items.length) return;

    const newItems = items.map((item) => {
      const { id } = item;

      return this.update({ id, checked });
    });
    
    return Promise.all(newItems).then(() => {});
  }

  deleteByTaskId(id: number) {
    return this.db.item_tasks.where("taskId").equals(id).delete();
  }
}

export const itemTaskDB = new ItemTaskDB();

// mockDB.on("populate", async () => {
//   await mockDB.item_tasks.bulkAdd(item_tasks);
// });
