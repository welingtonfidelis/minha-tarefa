import { ItemTask } from "../../../domains/itemTask";

export interface CreateItemTaskData extends Omit<ItemTask, 'id'> {}