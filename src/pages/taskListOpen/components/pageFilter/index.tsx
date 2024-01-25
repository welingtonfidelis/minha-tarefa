import { DebounceInput } from "react-debounce-input";
import { Button, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { taskListOpenPageStore } from "../../../../store/taskListOpenPage";
import { Content } from "./styles";
import { drawerEditTaskStore } from "../../../../store/drawerEditTask";

export const PageFilter = () => {
  const { t } = useTranslation();

  const { filters, updateFilterByName } = taskListOpenPageStore();
  const { updateIsDrawerOpen } = drawerEditTaskStore();

  return (
    <Content>
      <DebounceInput
        debounceTimeout={500}
        placeholder={t("pages.task_list_open.input_search_name")}
        type="text"
        marginEnd={3}
        value={filters.filterByName}
        onChange={(e) => updateFilterByName(e.target.value)}
        element={(field: any) => <Input {...field} />}
      />

      <Button
        minWidth={32}
        colorScheme="blue"
        onClick={() => updateIsDrawerOpen(true)}
      >
        {t("pages.task_list_open.button_new_task")}
      </Button>
    </Content>
  );
};
