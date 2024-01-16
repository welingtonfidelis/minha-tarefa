import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { Content, MainContent } from "./styles";
import { TaskListOpen } from "../taskListOpen";
import { TaskListClosed } from "../taskListClosed";
import { commonStore } from "../../store/commonStore";
import { FaClipboardList, FaListUl } from "react-icons/fa";

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
            <FaClipboardList size={24} />
          </Tab>
          <Tab>
            <FaListUl size={24} />
          </Tab>
        </TabList>
      </Tabs>
    </Content>
  );
};
