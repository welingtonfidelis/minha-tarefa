import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
} from "@chakra-ui/react";

import {
  Content,
  IconCheckCircle,
  IconClipboardList,
  MainContent,
  TabContent,
} from "./styles";
import { TaskListOpen } from "../taskListOpen";
import { TaskListClosed } from "../taskListClosed";
import { commonStore } from "../../store/commonStore";
import { useTranslation } from "react-i18next";

export const MainPage = () => {
  const { t } = useTranslation();
  const { updateIsTaskListOpenPageSelected } = commonStore();
  // const { isMobileScreen } = commonStore();

  return (
    <Content>
      <Tabs
        isFitted
        variant="enclosed"
        height="auto"
        onChange={(index) => updateIsTaskListOpenPageSelected(!index)}
      >
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
            <Tooltip label={t("pages.main_page.todo_tab_tooltip")} hasArrow>
              <Tab>
                <IconClipboardList />
              </Tab>
            </Tooltip>

            <Tooltip label={t("pages.main_page.done_tab_tooltip")} hasArrow>
              <Tab>
                <IconCheckCircle />
              </Tab>
            </Tooltip>
          </TabList>
        </TabContent>
      </Tabs>
    </Content>
  );
};
