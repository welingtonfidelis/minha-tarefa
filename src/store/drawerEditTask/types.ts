export type State = {
  isDrawerOpen: boolean;
  selectedTaskId: number;
};

export type Action = {
  updateIsDrawerOpen: (data: boolean) => void;
  updateSelectedTaskId: (data: number) => void;
};
