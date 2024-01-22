import { EmptyState } from "../../components/emptyState";
import { CardListContent, Content, MainContent } from "./styles";
import { PageFilter } from "./components/pageFilter";
import { DrawerEditTask } from "./components/drawerEditTask";
import { useGetTasks } from "../../services/requests/tasks";
import { taskListPageStore } from "../../store/taskListPage";
import { Pagination } from "../../components/pagination";
import { TaskListCard } from "../../components/taskListCard";
import { Preloader } from "../../components/preloader";

export const TaskListOpen = () => {
  const {
    filters,
    updatePageNumber,
  } = taskListPageStore();
  const { data, isLoading } = useGetTasks({ ...filters });

  return (
    <Content>
      <PageFilter />

      {data?.total ? (
        <MainContent>
          <Preloader isLoading={isLoading}>
            <CardListContent>
              <TaskListCard
                tasks={data?.tasks || []}
                isTaskOpenListPage
              />
            </CardListContent>

            <Pagination
              currentPage={filters.page}
              onPageChange={(page) => updatePageNumber(page)}
              totalItems={data.total}
            />
          </Preloader>
        </MainContent>
      ) : (
        <EmptyState />
      )}

      <DrawerEditTask />
    </Content>
  );
};
