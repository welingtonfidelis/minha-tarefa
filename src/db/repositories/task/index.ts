import Dexie from "dexie";
import { DB, mockDB } from "../db";
import { itemTaskDB } from "../itemTask";
import { CreateItemTaskData } from "../itemTask/types";
import { CreateTaskData, FindTaskParam } from "./types";

class TaskDB {
  db: DB;

  constructor() {
    this.db = mockDB;
  }

  async create(data: CreateTaskData) {
    const { items, ...rest } = data;
    const taskData = {
      ...rest,
      createdAt: new Date().toISOString(),
      checked: 0,
    };

    const taskId = await this.db.tasks.add(taskData as any);

    if (items && items.length) {
      const newItems = items.map((item) => ({
        name: item,
        taskId,
        checked: 0,
      })) as CreateItemTaskData[];
      itemTaskDB.create(newItems);
    }

    return { id: taskId };
  }

  async find(params: FindTaskParam) {
    const { page = 1, filterByClosed = false, filterByName = "" } = params;
    const pageNumber = page - 1;
    const pageSize = 20;
    const isChecked = filterByClosed ? 1 : 0;

    const tasks = await this.db.tasks
      .filter((task) => task.checked === isChecked)
      .filter((task) => task.name.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase()))
      .offset(pageNumber * pageSize)
      .limit(pageSize)
      .reverse()
      .sortBy("createdAt");

    const total = await this.db.tasks
      .filter((task) => task.checked === isChecked)
      .filter((task) => task.name.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase()))
      .count();

    // requests for include items on tasks
    // const tasksWithItems = await all(
    //   tasks.map(async (item) => {
    //     const items = await itemTaskDB.findById(item.id);

    //     return {
    //       ...item,
    //       items,
    //     };
    //   })
    // );

    return {
      total,
      tasks,
    };
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
