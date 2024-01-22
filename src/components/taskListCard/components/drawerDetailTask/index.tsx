import { useTranslation } from "react-i18next";
import { Drawer } from "../../../drawer";
import { taskListPageStore } from "../../../../store/taskListPage";
import { Preloader } from "../../../preloader";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import {
  useGetTaskById,
  useGetTasks,
  useUpdateItemTask,
  useUpdateTask,
} from "../../../../services/requests/tasks";
import { Props } from "./types";
import { ButtonContent, Content, ItemsContent, SectionContent } from "./styles";
import { useQueryClient } from "react-query";

export const DrawerDetailTask = (props: Props) => {
  const { t } = useTranslation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    filters,
    isDrawerDetailOpen,
    selectedTaskId,
    updateIsDrawerDetailOpen,
    updateSelectedTaskId,
  } = taskListPageStore();
  const { mutate: updateItemTask } = useUpdateItemTask();
  const { mutate: updateTask, isLoading: isUpdateTaskLoading } =
    useUpdateTask();
  const {
    data,
    isLoading: getTaskLoading,
    getQueryKey,
  } = useGetTaskById(selectedTaskId);
  const { refetch: refetchGetTasks } = useGetTasks(filters);

  const handleClose = () => {
    updateSelectedTaskId(0);
    updateIsDrawerDetailOpen(false);
  };

  const handleCheckedChange = (id: number, isChecked: Boolean) => {
    const checked = isChecked ? 1 : 0;

    updateItemTask(
      { id, checked },
      {
        onSuccess() {
          const updatedItems = data?.items.map((item) => {
            if (item.id === id) return { ...item, checked };

            return item;
          });

          queryClient.setQueryData(getQueryKey(), (oldData: any) => ({
            ...oldData,
            items: updatedItems,
          }));
        },
        onError() {
          toast({
            title: t(
              "components.drawer_detail_task.error_request_update_item_task"
            ),
            status: "error",
          });
        },
      }
    );
  };

  const handleCloseTask = () => {
    const updateTaskData = { id: selectedTaskId, checked: 1 } as any;

    updateTask(updateTaskData, {
      onSuccess(data) {
        toast({
          title: t(
            "components.drawer_detail_task.success_request_update_message"
          ),
        });

        refetchGetTasks();
        updateIsDrawerDetailOpen(false);
      },
      onError(error) {
        toast({
          title: t(
            "components.drawer_detail_task.error_request_update_message"
          ),
          status: "error",
        });
      },
    });
  };

  return (
    <Drawer
      title={data?.name ?? ""}
      isOpen={isDrawerDetailOpen}
      onClose={handleClose}
      onCloseButtonText={t("generic.button_back")}
    >
      <Preloader isLoading={getTaskLoading}>
        <Content>
          <SectionContent>
            <Accordion allowMultiple>
              <AccordionItem border="none">
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {t("components.drawer_detail_task.input_description")}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>{data?.description}</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </SectionContent>

          <SectionContent>
            <ItemsContent>
              {data?.items.map((item) => {
                return (
                  <Checkbox
                    isChecked={Boolean(item.checked)}
                    onChange={(e) =>
                      handleCheckedChange(item.id, e.target.checked)
                    }
                    key={item.id}
                  >
                    {item.name}
                  </Checkbox>
                );
              })}
            </ItemsContent>
          </SectionContent>

          <ButtonContent>
            <Button
              colorScheme="blue"
              onClick={handleCloseTask}
              isLoading={isUpdateTaskLoading}
            >
              {t("components.drawer_detail_task.button_done_task")}
            </Button>
          </ButtonContent>
        </Content>
      </Preloader>
    </Drawer>
  );
};
