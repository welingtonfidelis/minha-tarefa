import {
  Card,
  CardHeader,
  Grid,
  Heading,
  Text,
  useDisclosure,
  useToast,
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
import { AlertConfirm } from "../alertConfirm";
import { taskListPageStore } from "../../store/taskListPage";
import { useDeleteTask, useGetTasks } from "../../services/requests/tasks";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { DrawerDetailTask } from "./components/drawerDetailTask";

export const TaskListCard = (props: Props) => {
  const { tasks, isTaskOpenListPage } = props;
  const toast = useToast();
  const { t } = useTranslation();
  const {
    updateSelectedTaskId,
    updateIsDrawerEditOpen,
    updateIsDrawerDetailOpen,
    filters,
  } = taskListPageStore();
  const { refetch: refetchGetOpenedTasks } = useGetTasks(filters);
  const { mutate: deleteTask, isLoading: deleteTaskLoading } = useDeleteTask();

  const onClickTask = (id: number) => {
    updateSelectedTaskId(id);
    updateIsDrawerDetailOpen(true);
  };

  const onRestartTask = (id: number) => {
    console.log("restart", id);
  };

  const onEditTask = (id: number) => {
    updateSelectedTaskId(id);
    updateIsDrawerEditOpen(true);
  };

  const onDeleteTask = (id: number) => {
    deleteTask(id, {
      onSuccess(data) {
        toast({
          title: t(
            "pages.task_list_open.components.drawer_task.success_request_edit_message"
          ),
        });

        refetchGetOpenedTasks();
        updateIsDrawerEditOpen(false);
      },
      onError(error) {
        toast({
          title: t(
            "pages.task_list_open.components.drawer_task.error_request_edit_message"
          ),
          status: "error",
        });
      },
    });
  };

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        {tasks?.map((item) => {
          return (
            <Card key={item.id} variant="outline" size="sm">
              <CardHeader onClick={() => onClickTask(item.id)}>
                <Heading size="md">{item.name}</Heading>
              </CardHeader>

              <CardBodyContainer>
                <DescriptionContainer onClick={() => onClickTask(item.id)}>
                  <Text pt="2" fontSize="sm">
                    {item.description}
                  </Text>
                </DescriptionContainer>
                <ActionContainer>
                  <AlertConfirm
                    description={t(
                      "components.task_list.alert_description_delete_task"
                    )}
                    onConfirm={async () => onDeleteTask(item.id)}
                  >
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => {}}
                      title=""
                    />
                  </AlertConfirm>
                  {!isTaskOpenListPage && (
                    <AlertConfirm
                      description={t(
                        "components.task_list.alert_description_reset_task"
                      )}
                      onConfirm={async () => onRestartTask(item.id)}
                    >
                      <IconButton
                        icon={<ResetIcon />}
                        onClick={() => {}}
                        title=""
                      />
                    </AlertConfirm>
                  )}
                  {isTaskOpenListPage && (
                    <IconButton
                      icon={<EditIcon />}
                      onClick={async () => onEditTask(item.id)}
                      title=""
                    />
                  )}
                </ActionContainer>
              </CardBodyContainer>
            </Card>
          );
        })}
      </Grid>

      <DrawerDetailTask isTaskOpenListPage={isTaskOpenListPage} />
    </>
  );
};
