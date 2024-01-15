import { DB, mockDB } from "../db";
import { itemTaskDB } from "../itemTask";
import { ItemTaskFullDB } from "../itemTask/types";
import { TaskFullDB } from "./types";

class TaskDB {
  db: DB;

  constructor() {
    this.db = mockDB;
  }

  async create(data: TaskFullDB) {
    const { items, ...rest } = data;
    const taskId = await this.db.tasks.add(rest);

    if (items && items.length) {
      const newItems = items.map((item) => ({ name: item, taskId, checked: false })) as ItemTaskFullDB[];
      itemTaskDB.create(newItems);
    }

    return { id: taskId };
  }

//   count() {
//     return this.db.users.count();
//   }

//   find(page: number, loggedUserId: number) {
//     const pageNumber = page -1;
//     const pageSize = 20;

//     return this.db.users
//       .where("id")
//       .notEqual(loggedUserId)
//       .offset(pageNumber * pageSize)
//       .limit(pageSize)
//       .toArray();
//   }

//   findByUserNameOrEmail(username: string) {
//     return this.db.users
//       .where("username")
//       .equals(username)
//       .or("email")
//       .equals(username)
//       .toArray();
//   }

//   findById(id: number) {
//     return this.db.users.where("id").equals(id).toArray();
//   }

//   create(data: Omit<UserFullDB, 'id'>) {
//     return this.db.users.add(data);
//   }

//   update(id: number, data: Partial<UserFullDB>) {
//     return this.db.users.update(id, data);
//   }

//   delete(id: number) {
//     return this.db.users.delete(id);
//   }
}

export const taskDB = new TaskDB();
