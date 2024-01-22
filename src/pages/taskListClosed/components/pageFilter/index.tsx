import { DebounceInput } from "react-debounce-input";
import { Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Content } from "./styles";
import { taskListClosedPageStore } from "../../../../store/taskListClosedPage";

export const PageFilter = () => {
  const { t } = useTranslation();

  const { filters, updateFilterByName } = taskListClosedPageStore();

  return (
    <Content>
      <DebounceInput
        debounceTimeout={500}
        placeholder={t("pages.task_list_close.input_search_name")}
        type="text"
        value={filters.filterByName}
        onChange={(e) => updateFilterByName(e.target.value)}
        element={(field: any) => <Input {...field} />}
      />
    </Content>
  );
};
