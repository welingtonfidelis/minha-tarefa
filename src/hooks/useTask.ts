import { taskDB } from "../db/repositories/task";
import { TaskFullDB } from "../db/repositories/task/types";

export const useTask = () => {
  const createTask = (data: TaskFullDB) => {
    return taskDB.create(data);
  };

  return {
    createTask,
  };
};
