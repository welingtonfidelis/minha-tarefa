import { Button } from "@chakra-ui/react";

interface Props {
  icon: React.ReactElement;
  onClick: () => void;
  title: string;
}

export const IconButton = (props: Props) => {
  const { icon, title, onClick } = props;

  return (
    <Button onClick={onClick} title={title} variant="link">
      {icon}
    </Button>
  );
};
