import { EmptyState } from "../../components/emptyState";
import { Container } from "./styles";
import { PageFilter } from "./components/pageFilter";
import { DrawerEditTask } from "./components/drawerEditTask";

export const TaskList = () => {
  return (
    <Container>
      <PageFilter />

      <EmptyState />

      <DrawerEditTask />
    </Container>
  );
};
