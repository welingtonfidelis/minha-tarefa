export type State = {
  filters: {
    page: number;
    filterByName: string;
    filterByClosed: boolean;
  };
};

export type Action = {
  updatePageNumber: (data: number) => void;
  updateFilterByName: (data: string) => void;
};
