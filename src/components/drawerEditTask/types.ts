export interface Props {
  onAfterSave: () => void;
}

export interface FormProps {
  name: string;
  description: string;
  items: string[];
}
