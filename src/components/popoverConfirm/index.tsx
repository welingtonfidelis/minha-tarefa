import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { PropsWithChildren, useRef } from "react";
import { ChildrenContainer } from "./styles";
import { Props } from "./types";
import { useTranslation } from "react-i18next";

export const PopoverConfirm = (props: PropsWithChildren<Props>) => {
  const {
    title,
    description,
    isLoading,
    onConfirmText,
    onCancelText,
    onConfirm,
    children,
  } = props;
  const { t } = useTranslation();

  return (
    <>
      <Popover>
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <ChildrenContainer>{children}</ChildrenContainer>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="semibold">
                {title ?? t("generic.alert_title")}
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>{description}</PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Button variant="outline" onClick={onClose}>
                    {onCancelText || t("generic.button_no")}
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={onConfirm}
                    isLoading={isLoading}
                  >
                    {onConfirmText || t("generic.button_yes")}
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </>
        )}
      </Popover>
    </>
  );
};
