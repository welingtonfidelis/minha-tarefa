import { number } from "yup";
import { Task } from "../../../domains/task";

export interface CreateTaskData extends Omit<Task, 'id' | 'items' | 'checked' | 'createdAt'> {
    items?: string[];
}

export interface FindTaskParam {
    page: number;
    filterById?: number;
    filterByClosed?: boolean;
    filterByName?: string;
}