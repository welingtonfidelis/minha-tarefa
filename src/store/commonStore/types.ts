export type State = {
  isMobileScreen: boolean;
  isTaskListOpenPageSelected: boolean;
};

export type Action = {
  updateIsTaskListOpenPageSelected: (data: boolean) => void;
}