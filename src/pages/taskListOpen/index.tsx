import { EmptyState } from "../../components/emptyState";
import { Content } from "./styles";
import { PageFilter } from "./components/pageFilter";
import { DrawerEditTask } from "./components/drawerEditTask";
import { useGetTasks } from "../../services/requests/tasks";
import { taskListPageStore } from "../../store/taskListPage";

export const TaskListOpen = () => {
  const { filters } = taskListPageStore();
  const { data: tasks } = useGetTasks(filters);

  return (
    <Content>
      <PageFilter />

      <EmptyState />

      {tasks?.map((item) => item.name)}
      <DrawerEditTask />
    </Content>
  );
};
