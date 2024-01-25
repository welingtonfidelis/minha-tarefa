export interface Props {
  isDrawerOpen: boolean;
  selectedTaskId: number;
  onSave: () => void;
  onClose: () => void;
}

export interface FormProps {
  name: string;
  description: string;
  items: string[];
}
