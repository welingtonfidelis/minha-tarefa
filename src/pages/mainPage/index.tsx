import { TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { Content, MainContent } from "./styles";
import { TabMenu } from "./components/tabMenu";
import { TaskListOpen } from "../taskListOpen";
import { TaskListClosed } from "../taskListClosed";
import { commonStore } from "../../store/commonStore";

export const MainPage = () => {
  const { isMobileScreen } = commonStore();

  return (
    <Content>
      <Tabs isFitted variant="enclosed" height=" auto">
        {!isMobileScreen && <TabMenu />}

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

        {isMobileScreen && <TabMenu />}
      </Tabs>
    </Content>
  );
};
