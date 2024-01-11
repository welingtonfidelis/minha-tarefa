import { Tab, TabList } from "@chakra-ui/react";
import { FaClipboardList, FaListUl } from "react-icons/fa";

export const TabMenu = () => {
  return (
    <TabList>
      <Tab><FaClipboardList size={24} /></Tab>
      <Tab><FaListUl size={24} /></Tab>
    </TabList>
  );
};
