import { EmptyState } from "../../components/emptyState";
import { CardListContent, Content, MainContent } from "./styles";
import { PageFilter } from "./components/pageFilter";
import { DrawerEditTask } from "./components/drawerEditTask";
import { useGetTasks } from "../../services/requests/tasks";
import { taskListPageStore } from "../../store/taskListPage";
import { Pagination } from "../../components/pagination";
import { useTranslation } from "react-i18next";
import { TaskListCard } from "../../components/taskListCard";

export const TaskListOpen = () => {
  const { filters, updatePageNumber, updateSelectedTaskId, updateIsDrawerEditOpen } = taskListPageStore();
  const { data, isLoading } = useGetTasks({ ...filters });
  const tasks = data?.tasks;
  const total = data?.total;
  const { t } = useTranslation();

  const onClickTask = (id: number) => {
    console.log("click", id);
  };

  const onEditTask = (id: number) => {
    updateSelectedTaskId(id);
    updateIsDrawerEditOpen(true);
  };

  const onDeleteTask = (id: number) => {
    console.log("delete", id);
  };

  return (
    <Content>
      <PageFilter />

      {total ? (
        <MainContent>
          <CardListContent>
            <TaskListCard
              tasks={tasks || []}
              onClick={onClickTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </CardListContent>

          <Pagination
            currentPage={filters.page}
            onPageChange={(page) => updatePageNumber(page)}
            totalItems={data.total}
          />
        </MainContent>
      ) : (
        <EmptyState />
      )}

      <DrawerEditTask />
    </Content>
  );
};
