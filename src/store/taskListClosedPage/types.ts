export const FiltersType = {
  PAGE: 'page',
  FILTER_BY_NAME: 'filter_by_name',
}

export type State = {
  filters: {
    page: number;
    filterByName: string;
    filterByClosed: boolean;
  };
  isDrawerDetailOpen: boolean;
  selectedTaskId: number;
};

export type Action = {
  updatePageNumber: (data: number) => void;
  updateFilterByName: (data: string) => void;
  updateIsDrawerDetailOpen: (data: boolean) => void;
  updateSelectedTaskId: (data: number) => void;
};
