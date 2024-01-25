import { create } from "zustand";
import { State, Action } from "./types";

const initialState: State = {
  isDrawerOpen: false,
  selectedTaskId: 0
};

export const drawerEditTaskStore = create<State & Action>((set) => ({
  ...initialState,

  updateIsDrawerOpen: (data) => {
    return set((state) => ({ ...state, isDrawerOpen: data }));
  },

  updateSelectedTaskId: (data) => {
    return set((state) => ({ ...state, selectedTaskId: data }));
  },
}));
