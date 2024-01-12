import { FaMinusCircle } from "react-icons/fa";
import styled from "styled-components";

export const ItemInputContent = styled.div`
  border: 1px solid ${(props) => props.theme.colors.separator};
  padding: 0.5rem;
  border-radius: 6px;
  margin-top: -0.5rem;

  button {
    width: 100%;
    margin-top: 1rem;
  }
`;

export const ItemContent = styled.div`
  display: flex;
  margin-bottom: 0.5rem;

  div:first-of-type {
    margin-right: 0.5rem;
  }

  div:last-of-type {
    margin-top: 0.3rem;
  }
`;

export const IconMinus = styled(FaMinusCircle)`
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.error};
`;
