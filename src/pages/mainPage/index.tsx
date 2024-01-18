import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import {
  Content,
  IconCheckCircle,
  IconClipboardList,
  MainContent,
} from "./styles";
import { TaskListOpen } from "../taskListOpen";
import { TaskListClosed } from "../taskListClosed";
import { FaCheckCircle, FaClipboardList, FaListUl } from "react-icons/fa";

export const MainPage = () => {
  // const { isMobileScreen } = commonStore();

  return (
    <Content>
      <Tabs isFitted variant="enclosed" height=" auto">
        <MainContent>
          <TabPanels>
            <TabPanel>
              <TaskListOpen />
            </TabPanel>
            <TabPanel>
              <TaskListClosed />
            </TabPanel>
          </TabPanels>
        </MainContent>

        <TabList>
          <Tab>
            <IconClipboardList />
          </Tab>
          <Tab>
            <IconCheckCircle />
          </Tab>
        </TabList>
      </Tabs>
    </Content>
  );
};
