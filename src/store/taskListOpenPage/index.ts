import { create } from "zustand";
import { State, Action } from "./types";

const initialState: State = {
  filters: {
    page: 1,
    filterByName: "",
    filterByClosed: false,
  },
  isDrawerEditOpen: false,
  isDrawerDetailOpen: false,
  selectedTaskId: 0
};

export const taskListOpenPageStore = create<State & Action>((set) => ({
  ...initialState,

  updatePageNumber: (data) => {
    return set((state) => ({ filters: { ...state.filters, page: data } }));
  },

  updateFilterByName: (data) => {
    return set((state) => ({ filters: { ...state.filters, filterByName: data } }));
  },

  updateIsDrawerEditOpen: (data) => {
    return set((state) => ({ ...state, isDrawerEditOpen: data }));
  },

  updateIsDrawerDetailOpen: (data) => {
    return set((state) => ({ ...state, isDrawerDetailOpen: data }));
  },

  updateSelectedTaskId: (data) => {
    return set((state) => ({ ...state, selectedTaskId: data }));
  },
}));
