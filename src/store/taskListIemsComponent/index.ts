import { create } from "zustand";
import { State, Action } from "./types";

const initialState: State = {
  isDrawerEditOpen: false,
  isDrawerDetailOpen: false,
  isTaskListOpenPage: true,
  selectedTaskId: 0
};

export const taskListItemsComponentStore = create<State & Action>((set) => ({
  ...initialState,

  updateIsDrawerEditOpen: (data) => {
    return set((state) => ({ ...state, isDrawerEditOpen: data }));
  },

  updateIsDrawerDetailOpen: (data) => {
    return set((state) => ({ ...state, isDrawerDetailOpen: data }));
  },

  updateIsTaskListOpenPage: (data) => {
    return set((state) => ({ ...state, isTaskListOpenPage: data }));
  },

  updateSelectedTaskId: (data) => {
    return set((state) => ({ ...state, selectedTaskId: data }));
  },
}));
