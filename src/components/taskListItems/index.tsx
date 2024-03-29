import {
  Card,
  CardHeader,
  Grid,
  Heading,
  Text,
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
import { taskListOpenPageStore } from "../../store/taskListOpenPage";
import {
  useDeleteTask,
  useGetTasks,
  useResetTask,
} from "../../services/requests/tasks";
import { useTranslation } from "react-i18next";
import { DrawerDetailTask } from "../drawerDetailTask";
import { taskListClosedPageStore } from "../../store/taskListClosedPage";
import { PopoverConfirm } from "../popoverConfirm";
import { commonStore } from "../../store/commonStore";
import { DrawerEditTask } from "../drawerEditTask";
import { drawerEditTaskStore } from "../../store/drawerEditTask";
import { drawerDetailTaskStore } from "../../store/drawerDetailTask";

export const TaskListItems = (props: Props) => {
  const { tasks } = props;
  const toast = useToast();
  const { t } = useTranslation();
  const { isMobileScreen, isTaskListOpenPageSelected } = commonStore();
  const {
    updateIsDrawerOpen: updateIsDrawerEditOpen,
    updateSelectedTaskId: updateSelectedTaskIdEdit,
  } = drawerEditTaskStore();
  const {
    updateIsDrawerOpen: updateIsDrawerDetailOpen,
    updateSelectedTaskId: updateSelectedTaskIdDetail,
  } = drawerDetailTaskStore();
  const { filters: filtersOpenList } = taskListOpenPageStore();
  const { filters: filtersCLoseList } = taskListClosedPageStore();
  const { refetch: refetchGetOpenedTasks } = useGetTasks(filtersOpenList);
  const { refetch: refetchGetClosedTasks } = useGetTasks(filtersCLoseList);
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: resetTask } = useResetTask();

  const onClickTask = (id: number) => {
    updateSelectedTaskIdDetail(id);
    updateIsDrawerDetailOpen(true);
  };

  const onResetTask = (id: number) => {
    resetTask(id, {
      onSuccess(data) {
        toast({
          title: t(
            "components.drawer_detail_task.success_request_reset_message"
          ),
        });

        refetchGetOpenedTasks();
        refetchGetClosedTasks();
      },
      onError(error) {
        toast({
          title: t("components.drawer_detail_task.error_request_reset_message"),
          status: "error",
        });
      },
    });
  };

  const onEditTask = (id: number) => {
    updateSelectedTaskIdEdit(id);
    updateIsDrawerEditOpen(true);
  };

  const onDeleteTask = (id: number) => {
    deleteTask(id, {
      onSuccess(data) {
        toast({
          title: t(
            "pages.task_list_open.components.drawer_task.success_request_delete_message"
          ),
        });

        if (isTaskListOpenPageSelected) {
          refetchGetOpenedTasks();
          return;
        }

        refetchGetClosedTasks();
      },
      onError(error) {
        toast({
          title: t(
            "pages.task_list_open.components.drawer_task.error_request_delete_message"
          ),
          status: "error",
        });
      },
    });
  };

  return (
    <>
      <Grid
        templateColumns={`repeat(${isMobileScreen ? "2" : "3"}, 1fr)`}
        gap={2}
      >
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
                  <PopoverConfirm
                    description={t(
                      "components.task_list.alert_description_delete_task"
                    )}
                    onConfirm={() => onDeleteTask(item.id)}
                  >
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => {}}
                      title=""
                    />
                  </PopoverConfirm>
                  {!isTaskListOpenPageSelected && (
                    <PopoverConfirm
                      description={t(
                        "components.task_list.alert_description_restart_task"
                      )}
                      onConfirm={() => onResetTask(item.id)}
                    >
                      <IconButton
                        icon={<ResetIcon />}
                        onClick={() => {}}
                        title=""
                      />
                    </PopoverConfirm>
                  )}
                  {isTaskListOpenPageSelected && (
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

      <DrawerDetailTask
        onAfterSave={() => {
          refetchGetOpenedTasks();
          refetchGetClosedTasks();
        }}
      />

      {isTaskListOpenPageSelected && (
        <DrawerEditTask onAfterSave={() => refetchGetOpenedTasks()} />
      )}
    </>
  );
};
