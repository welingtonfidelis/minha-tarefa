import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { PropsWithChildren, useRef } from "react";
import { useTranslation } from "react-i18next";

import { Props } from "./types";
import { ChildrenContainer } from "./styles";

export const AlertConfirm = (props: PropsWithChildren<Props>) => {
  const {
    title,
    description,
    isLoading,
    onConfirmText,
    onCancelText,
    onConfirm,
    children,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const { t } = useTranslation();

  return (
    <>
      <ChildrenContainer onClick={onOpen}>{children}</ChildrenContainer>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent alignSelf={"center"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title ?? t("generic.alert_title")}
            </AlertDialogHeader>

            <AlertDialogCloseButton />

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {onCancelText || t("generic.button_no")}
              </Button>
              {onConfirm && (
                <Button
                  colorScheme="red"
                  onClick={() => onConfirm().then(() => onClose())}
                  ml={3}
                  isLoading={isLoading}
                >
                  {onConfirmText || t("generic.button_yes")}
                </Button>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
