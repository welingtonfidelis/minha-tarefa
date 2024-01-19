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
  const { filters, updatePageNumber } = taskListPageStore();
  const { data, isLoading } = useGetTasks({ ...filters });
  const tasks = data?.tasks;
  const total = data?.total;
  const { t } = useTranslation();

  const onClickTask = (id: number) => {
    console.log("click", id);
  };

  const onEditTask = (id: number) => {
    console.log("edit", id);
  };

  const onDeleteTask = (id: number) => {
    console.log("delete", id);
  };

  const onRestartTask = (id: number) => {
    console.log("restart", id);
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
              onRestart={onRestartTask}
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
