import { create } from "zustand";
import { State, Action } from "./types";

const initialState: State = {
  filters: {
    page: 1,
    filterByName: "",
    filterByClosed: false,
  },
};

export const taskListOpenPageStore = create<State & Action>((set) => ({
  ...initialState,

  updatePageNumber: (data) => {
    return set((state) => ({ filters: { ...state.filters, page: data } }));
  },

  updateFilterByName: (data) => {
    return set((state) => ({ filters: { ...state.filters, filterByName: data } }));
  },
}));
