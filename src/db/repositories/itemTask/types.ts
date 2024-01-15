import { ITemTask } from "../../../domains/itemTask";

export interface ItemTaskFullDB extends Omit<ITemTask, 'id'> {
    id?: number;
}