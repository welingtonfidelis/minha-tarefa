import { Task } from "../../domains/task";

export interface Props {
    tasks: Omit<Task, 'items'>[];

    onClick: (id: number) => void;
    onDelete?: (id: number) => Promise<void>;
    onRestart?: (id: number) => Promise<void>;
    onEdit?: (id: number) => void;
} 