export const FiltersType = {
  PAGE: 'page',
  FILTER_BY_NAME: 'filter_by_name',
}

export type State = {
  filters: {
    page: number;
    filterByName: string;
  };
  isDrawerOpen: boolean;
  selectedTaskId: number;
};

export type Action = {
  updatePageNumber: (data: number) => void;
  updateFilterByName: (data: string) => void;
  updateIsDrawerEditOpen: (data: boolean) => void;
  updateSelectedTaskId: (data: number) => void;
};
