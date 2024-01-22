import { ItemTask } from "../../../domains/itemTask";

export interface CreateItemTaskData extends Omit<ItemTask, 'id'> {}
export interface UpdateItemTaskData extends Partial<ItemTask> {
    id: number;
}