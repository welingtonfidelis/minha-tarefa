import { DB, mockDB } from "../db";
import { itemTaskDB } from "../itemTask";
import { CreateItemTaskData } from "../itemTask/types";
import { CreateTaskData, FindTaskParam, UpdateTaskData } from "./types";

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
      .filter((task) =>
        task.name.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase())
      )
      .offset(pageNumber * pageSize)
      .limit(pageSize)
      .reverse()
      .sortBy("createdAt");

    const total = await this.db.tasks
      .filter((task) => task.checked === isChecked)
      .filter((task) =>
        task.name.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase())
      )
      .count();

    return {
      total,
      tasks,
    };
  }

  async findById(id: number) {
    const [task] = await this.db.tasks.where("id").equals(id).toArray();

    const items = await itemTaskDB.findByTaskId(id);

    return { ...task, items };
  }

  async update(data: UpdateTaskData) {
    const { id, items, ...rest } = data;
    const taskUpdated = await this.db.tasks.update(id, rest);

    if (taskUpdated) {
      await itemTaskDB.deleteByTaskId(id);

      if (items && items.length) {
        const newItems = items.map((item) => ({
          name: item,
          taskId: id,
          checked: 0,
        })) as CreateItemTaskData[];

        await itemTaskDB.create(newItems);
      }
    }

    return;
  }
}

export const taskDB = new TaskDB();
