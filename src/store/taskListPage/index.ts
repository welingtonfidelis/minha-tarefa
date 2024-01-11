import { create } from "zustand";
import { State, Action } from "./types";

const initialState = {
  filters: {
    page: 1,
    filter_by_id: "",
    filter_by_name: "",
  },
  is_drawer_edit_open: false,
  selected_task_id: null,
};

export const taskListPageStore = create<State & Action>((set) => ({
  ...initialState,

  updatePageNumber: (data) => {
    return set((state) => ({ filters: { ...state.filters, page: data } }));
  },

  updateFilterByName: (data) => {
    return set((state) => {
      const filters = {
        filters: { ...state.filters, filter_by_name: data },
      };

      return filters;
    });
  },

  updateIsDrawerEditOpen: (data) => {
    return set((state) => ({ ...state, is_drawer_edit_open: data }));
  },

  updateSelectedTaskId: (data) => {
    return set((state) => ({ ...state, selected_task_id: data }));
  },
}));
