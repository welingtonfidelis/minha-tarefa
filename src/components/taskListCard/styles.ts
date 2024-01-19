import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import styled from "styled-components";

const commumIconFontSize = `
  font-size: 18px;
`;

export const CardBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 10px 10px 10px;
`;

export const DescriptionContainer = styled.div`
  flex: 1;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
    padding-top: 8px;
    border-top: .5px solid var(--separator);
`;

export const EditIcon = styled(FaPencilAlt)`
  ${commumIconFontSize}
  color: var(--success);
`;

export const ResetIcon = styled(FaRepeat)`
  ${commumIconFontSize}
  color: var(--warning) !important;
`;

export const DeleteIcon = styled(FaTrash)`
  ${commumIconFontSize}
  color: var(--error);
`;
