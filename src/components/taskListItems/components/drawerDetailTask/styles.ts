import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SectionContent = styled.section`
  border: 1px solid var(--separator);
  margin-bottom: 10px;
  border-radius: 6px;
  padding: 0.5rem;
`;

export const ItemsContent = styled.div`
  display: flex;
  flex-direction: column;

  span:last-of-type {
    width: calc(100% - 20px);
  }

  label {
    margin-bottom: 0.3rem;
  }
`;

export const ButtonContent = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  
  button {
    width: 100%;
    margin-top: 1rem;
  }
`;
