export type State = {
  filters: {
    page: number;
    filterByName: string;
    filterByClosed: boolean;
  };
  isDrawerEditOpen: boolean;
  isDrawerDetailOpen: boolean;
  selectedTaskId: number;
};

export type Action = {
  updatePageNumber: (data: number) => void;
  updateFilterByName: (data: string) => void;
  updateIsDrawerEditOpen: (data: boolean) => void;
  updateIsDrawerDetailOpen: (data: boolean) => void;
  updateSelectedTaskId: (data: number) => void;
};
