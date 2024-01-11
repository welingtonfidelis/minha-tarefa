export const FiltersType = {
  PAGE: 'page',
  FILTER_BY_NAME: 'filter_by_name',
}

export type State = {
  filters: {
    page: number;
    filter_by_name: string;
  };
  is_drawer_edit_open: boolean;
  selected_task_id: number | null;
};

export type Action = {
  updatePageNumber: (data: number) => void;
  updateFilterByName: (data: string) => void;
  updateIsDrawerEditOpen: (data: boolean) => void;
  updateSelectedTaskId: (data: number | null) => void;
};
