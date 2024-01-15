import Dexie, { Table } from "dexie";
import { TaskFullDB } from "./task/types";
import { ItemTaskFullDB } from "./itemTask/types";

export class DB extends Dexie {
  tasks!: Table<TaskFullDB>;
  item_tasks!: Table<ItemTaskFullDB>;

  constructor() {
    super("minha_tarefa_db");
    this.version(1).stores({
      tasks: "++id, name",
      item_tasks: "++id, taskId",
    });
  }
}

export const mockDB = new DB();
