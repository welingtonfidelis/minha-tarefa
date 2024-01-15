import { ITemTask } from "./itemTask";

export interface Task {
  id: number;
  name: string;
  description: string;
  items: ITemTask[];
}
