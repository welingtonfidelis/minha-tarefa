export type State = {
  isDrawerEditOpen: boolean;
  isDrawerDetailOpen: boolean;
  isTaskListOpenPage: boolean;
  selectedTaskId: number;
};

export type Action = {
  updateIsDrawerEditOpen: (data: boolean) => void;
  updateIsDrawerDetailOpen: (data: boolean) => void;
  updateIsTaskListOpenPage: (data: boolean) => void;
  updateSelectedTaskId: (data: number) => void;
};
