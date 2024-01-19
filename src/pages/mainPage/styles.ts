import { FaCheckCircle, FaClipboardList } from "react-icons/fa";
import styled from "styled-components";

export const Content = styled.div`
  height: 100%;
  .chakra-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const MainContent = styled.div`
  flex: 1;
`;

export const IconClipboardList = styled(FaClipboardList)`
  font-size: 24px;
`;

export const IconCheckCircle = styled(FaCheckCircle)`
  font-size: 24px;
`;

export const TabContent = styled.div`
  background-color: var(--background2);
`