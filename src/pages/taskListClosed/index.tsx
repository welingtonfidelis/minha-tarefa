import { EmptyState } from "../../components/emptyState";
import { CardListContent, Content, MainContent } from "./styles";
import { PageFilter } from "./components/pageFilter";
import { useGetTasks } from "../../services/requests/tasks";
import { Pagination } from "../../components/pagination";
import { TaskListItems } from "../../components/taskListItems";
import { Preloader } from "../../components/preloader";
import { taskListClosedPageStore } from "../../store/taskListClosedPage";

export const TaskListClosed = () => {
  const { filters, updatePageNumber } = taskListClosedPageStore();
  const { data, isLoading } = useGetTasks(filters);

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
