import { FaMinusCircle } from "react-icons/fa";
import styled from "styled-components";

export const ItemInputContent = styled.div`
  border: 1px solid var(--separator);
  padding: 0.5rem;
  border-radius: 6px;
  margin-top: -0.5rem;

  button {
    width: 100%;
  }
`;

export const ItemContent = styled.div`
  display: flex;
  margin-bottom: 0.5rem;

  div:first-of-type {
    margin-right: 0.5rem;
    flex: 10;
  }

  div:last-of-type {
    margin-top: 0.3rem;
  }

  button {
    flex: 1;
  }
`;

export const IconMinus = styled(FaMinusCircle)`
  font-size: 1.8rem;
  color: var(--error);
`;
