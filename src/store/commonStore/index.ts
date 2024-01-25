import { create } from "zustand";
import { State, Action } from "./types";

const initialState: State = {
  isMobileScreen: false,
  isTaskListOpenPageSelected: true
};

export const commonStore = create<State & Action>((set) => {
  const { innerWidth } = window;
  const isMobileScreen = innerWidth <= 600;

  return {
    ...initialState,
    isMobileScreen,

    updateIsTaskListOpenPageSelected: (data) => {
      return set((state) => ({ ...state, isTaskListOpenPageSelected: data }));
    },
  };
});
