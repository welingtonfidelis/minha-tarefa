import { Card, CardHeader, Grid, Heading, Text } from "@chakra-ui/react";
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
import { AlertConfirm } from "../alertConfirm";
import { t } from "i18next";

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
                  <AlertConfirm
                    description={t(
                      "components.task_list.alert_description_delete_task"
                    )}
                    onConfirm={() => onDelete(item.id)}
                  >
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => {}}
                      title=""
                    />
                  </AlertConfirm>
                )}
                {onRestart && (
                  <AlertConfirm
                    description={t(
                      "components.task_list.alert_description_reset_task"
                    )}
                    onConfirm={() => onRestart(item.id)}
                  >
                    <IconButton
                      icon={<ResetIcon />}
                      onClick={() => {}}
                      title=""
                    />
                  </AlertConfirm>
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
