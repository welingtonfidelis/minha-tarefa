import Dexie, { Table } from "dexie";
import { Task } from "../../domains/task";
import { ItemTask } from "../../domains/itemTask";

export class DB extends Dexie {
  tasks!: Table<Omit<Task, 'items'>>;
  item_tasks!: Table<ItemTask>;

  constructor() {
    super("minha_tarefa_db");
    this.version(1).stores({
      tasks: "++id, name, closedAt, checked, [checked+name]",
      item_tasks: "++id, taskId",
    });
  }
}

export const mockDB = new DB();
