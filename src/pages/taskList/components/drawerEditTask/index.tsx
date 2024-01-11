import { useTranslation } from "react-i18next";
import { Drawer } from "../../../../components/drawer";
import { taskListPageStore } from "../../../../store/taskListPage";

export const DrawerEditTask = () => {
  const { t } = useTranslation();
  const { is_drawer_edit_open, selected_task_id, updateIsDrawerEditOpen } =
    taskListPageStore();

  return (
    <Drawer
      title={
        selected_task_id
          ? t("pages.task_list.components.drawer_task.edit_task_title")
          : t("pages.task_list.components.drawer_task.new_task_title")
      }
      onConfirm={() => console.log("confirm")}
      isOpen={is_drawer_edit_open}
      onClose={() => updateIsDrawerEditOpen(false)}
      // extraActionButton={<DeleteEventButton />}
      onConfirmLoading={false}
    >
      <h2>test</h2>
    </Drawer>
  );
};
