import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import {
  Content,
  IconCheckCircle,
  IconClipboardList,
  MainContent,
  TabContent,
} from "./styles";
import { TaskListOpen } from "../taskListOpen";
import { TaskListClosed } from "../taskListClosed";

export const MainPage = () => {
  // const { isMobileScreen } = commonStore();

  return (
    <Content>
      <Tabs isFitted variant="enclosed" height="auto">
        <MainContent>
          <TabPanels>
            <TabPanel paddingBottom={0}>
              <TaskListOpen />
            </TabPanel>
            <TabPanel>
              <TaskListClosed />
            </TabPanel>
          </TabPanels>
        </MainContent>

        <TabContent>
          <TabList>
            <Tab>
              <IconClipboardList />
            </Tab>
            <Tab>
              <IconCheckCircle />
            </Tab>
          </TabList>
        </TabContent>
      </Tabs>
    </Content>
  );
};
