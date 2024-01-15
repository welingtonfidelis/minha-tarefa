import { EmptyState } from "../../components/emptyState";
import { Content } from "./styles";
import { PageFilter } from "./components/pageFilter";
import { DrawerEditTask } from "./components/drawerEditTask";

export const TaskListOpen = () => {
  return (
    <Content>
      <PageFilter />

      <EmptyState />

      <DrawerEditTask />
    </Content>
  );
};
