import { Task } from "../../../domains/task";

export interface TaskFullDB extends Omit<Task, 'id' | 'items'> {
    id?: number;
    items?: string[];
}