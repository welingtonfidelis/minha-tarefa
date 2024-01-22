import { create } from "zustand";
import { State, Action } from "./types";

const initialState: State = {
  filters: {
    page: 1,
    filterByName: "",
    filterByClosed: true,
  },
  isDrawerDetailOpen: false,
  selectedTaskId: 0
};

export const taskListClosedPageStore = create<State & Action>((set) => ({
  ...initialState,

  updatePageNumber: (data) => {
    return set((state) => ({ filters: { ...state.filters, page: data } }));
  },

  updateFilterByName: (data) => {
    return set((state) => ({ filters: { ...state.filters, filterByName: data } }));
  },

  updateIsDrawerDetailOpen: (data) => {
    return set((state) => ({ ...state, isDrawerDetailOpen: data }));
  },

  updateSelectedTaskId: (data) => {
    return set((state) => ({ ...state, selectedTaskId: data }));
  },
}));
