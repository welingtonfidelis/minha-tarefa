export interface Props {
    isDrawerOpen: boolean;
    isTaskListOpenPage: boolean;
    selectedTaskId: number;
    onClose: () => void;
}