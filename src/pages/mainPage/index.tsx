import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Dashboard } from "../dashboard"
import { ListTask } from "../listTask"
import { Content, MainContet } from "./styles";

export const MainPage = () => {
    const { innerWidth } = window;
    const isMobileScreen = innerWidth <= 600;

    return (<Content>
        <Tabs isFitted variant='enclosed'  height=' auto'>
            {
                !isMobileScreen && (
                    <TabList >
                        <Tab>One</Tab>
                        <Tab>Two</Tab>
                    </TabList>
                )
            }

            <MainContet>
                <TabPanels>
                    <TabPanel>
                        <Dashboard />
                    </TabPanel>
                    <TabPanel>
                        <ListTask />
                    </TabPanel>
                </TabPanels>
            </MainContet>

            {
                isMobileScreen && (
                    <TabList >
                        <Tab>One</Tab>
                        <Tab>Two</Tab>
                    </TabList>
                )
            }
        </Tabs>
    </Content>
    )
}