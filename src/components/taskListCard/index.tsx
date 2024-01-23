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
  useUpdateTask,
} from "../../services/requests/tasks";
import { useTranslation } from "react-i18next";
import { DrawerDetailTask } from "./components/drawerDetailTask";
import { taskListClosedPageStore } from "../../store/taskListClosedPage";
import { PopoverConfirm } from "../popoverConfirm";
import { commonStore } from "../../store/commonStore";

export const TaskListCard = (props: Props) => {
  const { tasks, isTaskOpenListPage } = props;
  const toast = useToast();
  const { t } = useTranslation();
  const {
    updateSelectedTaskId,
    updateIsDrawerEditOpen,
    updateIsDrawerDetailOpen,
    filters: filtersOpenList,
  } = taskListOpenPageStore();
  const { filters: filtersCLoseList } = taskListClosedPageStore();
  const { isMobileScreen } = commonStore();
  const { refetch: refetchGetOpenedTasks } = useGetTasks(filtersOpenList);
  const { refetch: refetchGetClosedTasks } = useGetTasks(filtersCLoseList);
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const onClickTask = (id: number) => {
    updateSelectedTaskId(id);
    updateIsDrawerDetailOpen(true);
  };

  const onResetTask = (id: number) => {
    const updateTaskData = { id, checked: 0 } as any;

    updateTask(updateTaskData, {
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
    updateSelectedTaskId(id);
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

        if (isTaskOpenListPage) {
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
      <Grid templateColumns={`repeat(${isMobileScreen ? '2' : '3'}, 1fr)`} gap={2}>
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
                  {!isTaskOpenListPage && (
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
