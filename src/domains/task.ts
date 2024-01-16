import { ItemTask } from "./itemTask";

export interface Task {
  id: number;
  name: string;
  description: string;
  checked: 0 | 1;
  createdAt: Date;
  closedAt?: Date;
  items: ItemTask[];
}
