import { EmptyState } from "../../components/emptyState";
import { CardListContent, Content, MainContent } from "./styles";
import { PageFilter } from "./components/pageFilter";
import { useGetTasks } from "../../services/requests/tasks";
import { taskListOpenPageStore } from "../../store/taskListOpenPage";
import { Pagination } from "../../components/pagination";
import { TaskListItems } from "../../components/taskListItems";
import { Preloader } from "../../components/preloader";

export const TaskListOpen = () => {
  const { filters, updatePageNumber } = taskListOpenPageStore();
  const { data, isLoading } = useGetTasks({ ...filters });

  return (
    <Content>
      <PageFilter />

      {data?.total ? (
        <MainContent>
          <Preloader isLoading={isLoading}>
            <CardListContent>
              <TaskListItems tasks={data?.tasks || []} />
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
    </Content>
  );
};
