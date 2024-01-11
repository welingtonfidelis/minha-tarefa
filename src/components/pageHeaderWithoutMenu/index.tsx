import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";

import { Container, IconBackContainer, TitleContainer } from "./styles";
import { PageHeaderProps } from "./types";
import { IconButton } from "../iconButton";

export const PageHeaderWithoutMenu = (props: PageHeaderProps) => {
  const { title } = props;
  const { t } = useTranslation();

  return (
    <Container>
      <IconBackContainer>
        <IconButton
          icon={<FaArrowLeft size={22} />}
          onClick={() => {}}
          title={t("generic.button_back_page")}
        />
      </IconBackContainer>

      <TitleContainer>{title}</TitleContainer>
    </Container>
  );
};
