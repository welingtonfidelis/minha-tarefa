import { Task } from "../../domains/task";

export interface Props {
    tasks: Omit<Task, 'items'>[];
    isTaskOpenListPage: boolean;
} 