import { Task } from "../../domains/task";

export interface Props {
    tasks: Omit<Task, 'items'>[];

    onClick: (id: number) => void;
    onDelete?: (id: number) => void;
    onRestart?: (id: number) => void;
    onEdit?: (id: number) => void;
} 