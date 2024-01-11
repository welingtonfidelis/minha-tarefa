import { TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Dashboard } from "../dashboard";
import { TaskList } from "../taskList";
import { Content, MainContent } from "./styles";
import { TabMenu } from "./components/tabMenu";

export const MainPage = () => {
  const { innerWidth } = window;
  const isMobileScreen = innerWidth <= 600;

  return (
    <Content>
      <Tabs isFitted variant="enclosed" height=" auto">
        {!isMobileScreen && <TabMenu />}

        <MainContent>
          <TabPanels>
            <TabPanel>
              <Dashboard />
            </TabPanel>
            <TabPanel>
              <TaskList />
            </TabPanel>
          </TabPanels>
        </MainContent>

        {isMobileScreen && <TabMenu />}
      </Tabs>
    </Content>
  );
};
