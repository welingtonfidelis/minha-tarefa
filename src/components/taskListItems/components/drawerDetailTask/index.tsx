import { useTranslation } from "react-i18next";
import { Drawer } from "../../../drawer";
import { taskListOpenPageStore } from "../../../../store/taskListOpenPage";
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
  useCloseTask,
  useGetTaskById,
  useGetTasks,
  useUpdateItemTask,
} from "../../../../services/requests/tasks";
import { ButtonContent, Content, ItemsContent, SectionContent } from "./styles";
import { useQueryClient } from "react-query";
import { taskListClosedPageStore } from "../../../../store/taskListClosedPage";
import { Props } from "./types";

export const DrawerDetailTask = (props: Props) => {
  const { isDrawerOpen, onClose, selectedTaskId, isTaskListOpenPage } = props;
  const { t } = useTranslation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { filters: filtersOpenList } = taskListOpenPageStore();
  const { filters: filtersCLoseList } = taskListClosedPageStore();
  const { mutate: updateItemTask } = useUpdateItemTask();
  const { mutate: closeTask, isLoading: isCloseTaskLoading } = useCloseTask();
  const {
    data,
    isLoading: getTaskLoading,
    getQueryKey,
  } = useGetTaskById(selectedTaskId);
  const { refetch: refetchGetOpenTasks } = useGetTasks(filtersOpenList);
  const { refetch: refetchGetClosedTasks } = useGetTasks(filtersCLoseList);

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
    closeTask(selectedTaskId, {
      onSuccess(data) {
        toast({
          title: t(
            "components.drawer_detail_task.success_request_update_message"
          ),
        });

        refetchGetOpenTasks();
        refetchGetClosedTasks();
        onClose();
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
      isOpen={isDrawerOpen}
      onClose={onClose}
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
                    disabled={!isTaskListOpenPage}
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

          {isTaskListOpenPage && (
            <ButtonContent>
              <Button
                colorScheme="blue"
                onClick={handleCloseTask}
                isLoading={isCloseTaskLoading}
              >
                {t("components.drawer_detail_task.button_done_task")}
              </Button>
            </ButtonContent>
          )}
        </Content>
      </Preloader>
    </Drawer>
  );
};
