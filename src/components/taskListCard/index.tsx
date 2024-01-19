import {
  Card,
  CardHeader,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Props } from "./types";
import {
  ActionContainer,
  CardBodyContainer,
  DeleteIcon,
  DescriptionContainer,
  EditIcon,
  ResetIcon,
} from "./styles";
import { IconButton } from "../iconButton";

export const TaskListCard = (props: Props) => {
  const { tasks, onClick, onDelete, onEdit, onRestart } = props;

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
      {tasks?.map((item) => {
        return (
          <Card key={item.id} variant="outline" size="sm">
            <CardHeader onClick={() => onClick(item.id)}>
              <Heading size="md">{item.name}</Heading>
            </CardHeader>

            <CardBodyContainer>
              <DescriptionContainer onClick={() => onClick(item.id)}>
                <Text pt="2" fontSize="sm">
                  {item.description}
                </Text>
              </DescriptionContainer>
              <ActionContainer>
                {onDelete && (
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => onDelete(item.id)}
                    title=""
                  />
                )}
                {onRestart && (
                  <IconButton
                    icon={<ResetIcon />}
                    onClick={() => onRestart(item.id)}
                    title=""
                  />
                )}
                {onEdit && (
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => onEdit(item.id)}
                    title=""
                  />
                )}
              </ActionContainer>
            </CardBodyContainer>
          </Card>
        );
      })}
    </Grid>
  );
};
