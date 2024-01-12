import { useTranslation } from "react-i18next";
import { Drawer } from "../../../../components/drawer";
import { taskListPageStore } from "../../../../store/taskListPage";
import { Preloader } from "../../../../components/preloader";
import { useMemo, useRef } from "react";
import {
  Field,
  FieldArray,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import { FormProps } from "./types";
import { formValidate } from "./helper/formValidate";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { IconMinus, ItemContent, ItemInputContent } from "./styles";
import { IconButton } from "../../../../components/iconButton";

export const DrawerEditTask = () => {
  const { t } = useTranslation();
  const { is_drawer_edit_open, selected_task_id, updateIsDrawerEditOpen } =
    taskListPageStore();
  const validateFormFields = formValidate();

  const formRef = useRef<FormikProps<FormProps>>(null);

  const initialFormValues = useMemo(
    () => ({
      name: "",
      description: "",
      items: ["itemA", "itemB"],
    }),
    [selected_task_id]
  );

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    if (selected_task_id) {
      console.log("update", values);

      // updateEvent(
      //   { id: Number(id), data: values },
      //   {
      //     onSuccess() {
      //       toast({
      //         title: t("components.event_detail.success_request_new_message"),
      //       });

      //       handleCloseModal();
      //       refetchList();
      //     },
      //     onError(error) {
      //       toast({
      //         title: t("components.event_detail.error_request_new_message"),
      //         status: "error",
      //       });
      //     },
      //   }
      // );

      return;
    }

    console.log("create", values);
  };

  return (
    <Drawer
      title={
        selected_task_id
          ? t("pages.task_list.components.drawer_task.edit_task_title")
          : t("pages.task_list.components.drawer_task.new_task_title")
      }
      onConfirm={() => formRef.current?.handleSubmit()}
      isOpen={is_drawer_edit_open}
      onClose={() => updateIsDrawerEditOpen(false)}
      onConfirmLoading={false}
    >
      <Preloader isLoading={false}>
        <Formik
          innerRef={formRef}
          initialValues={initialFormValues}
          validationSchema={validateFormFields}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values }) => (
            <Form>
              <Field name="name">
                {({ field }: any) => (
                  <FormControl isInvalid={!!errors.name && touched.name}>
                    <FormLabel mt="2" mb="0.2">
                      {t("pages.task_list.components.drawer_task.input_name")}
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder={t(
                        "pages.task_list.components.drawer_task.input_name"
                      )}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="description">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!errors.description && touched.description}
                  >
                    <FormLabel mt="2" mb="0.2">
                      {t(
                        "pages.task_list.components.drawer_task.input_description"
                      )}
                    </FormLabel>
                    <Textarea
                      {...field}
                      resize="none"
                      placeholder={t(
                        "pages.task_list.components.drawer_task.input_description"
                      )}
                    />
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <FormLabel>
                {t("pages.task_list.components.drawer_task.input_items")}
              </FormLabel>
              <ItemInputContent>
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <>
                      {values.items.map((item, index) => (
                        <ItemContent key={index}>
                          <Field name={`items.${index}`}>
                            {({ field }: any) => (
                              <FormControl
                                isInvalid={
                                  !!errors.items?.[index] && touched.items
                                }
                              >
                                <Input
                                  {...field}
                                  placeholder={t(
                                    "pages.task_list.components.drawer_task.input_item_name"
                                  )}
                                />
                                <FormErrorMessage>
                                  {errors.items && errors.items[index]}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <IconButton
                            icon={<IconMinus />}
                            onClick={() => arrayHelpers.remove(index)}
                            title="test"
                          />
                        </ItemContent>
                      ))}

                      <Button
                        onClick={() => arrayHelpers.push("")}
                        colorScheme="green"
                      >
                        {t(
                          "pages.task_list.components.drawer_task.button_add_item"
                        )}
                      </Button>
                    </>
                  )}
                />
              </ItemInputContent>
            </Form>
          )}
        </Formik>
      </Preloader>
    </Drawer>
  );
};
