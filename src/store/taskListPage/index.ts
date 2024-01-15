import { create } from "zustand";
import { State, Action } from "./types";

const initialState = {
  filters: {
    page: 1,
    filterByIdd: "",
    filterByName: "",
  },
  isDrawerOpen: false,
  selectedTaskId: null,
};

export const taskListPageStore = create<State & Action>((set) => ({
  ...initialState,

  updatePageNumber: (data) => {
    return set((state) => ({ filters: { ...state.filters, page: data } }));
  },

  updateFilterByName: (data) => {
    return set((state) => {
      const filters = {
        filters: { ...state.filters, filterByName: data },
      };

      return filters;
    });
  },

  updateIsDrawerEditOpen: (data) => {
    return set((state) => ({ ...state, isDrawerOpen: data }));
  },

  updateSelectedTaskId: (data) => {
    return set((state) => ({ ...state, selectedTaskId: data }));
  },
}));
