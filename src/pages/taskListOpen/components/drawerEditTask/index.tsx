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
  useToast,
} from "@chakra-ui/react";
import { IconMinus, ItemContent, ItemInputContent } from "./styles";
import { IconButton } from "../../../../components/iconButton";
import {
  useCreateTask,
  useGetTaskById,
  useGetTasks,
  useUpdateTask,
} from "../../../../services/requests/tasks";

export const DrawerEditTask = () => {
  const { t } = useTranslation();
  const {
    filters,
    isDrawerOpen,
    selectedTaskId,
    updateIsDrawerEditOpen,
    updateSelectedTaskId,
  } = taskListPageStore();
  const validateFormFields = formValidate();
  const { mutate: createTask, isLoading: createTaskLoading } = useCreateTask();
  const { mutate: updateTask, isLoading: updateTaskLoading } = useUpdateTask();
  const { data, refetch: refetchGetTaskById, isLoading: getTaskLoading } = useGetTaskById(selectedTaskId);
  const { refetch: refetchGetTasks } = useGetTasks(filters);
  const toast = useToast();
  const formRef = useRef<FormikProps<FormProps>>(null);

  const initialFormValues = useMemo(
    () => ({
      name: data?.name || "",
      description: data?.description || "",
      items: data?.items.map((item) => item.name) || [],
    }),
    [data]
  );

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    if (selectedTaskId) {
      const updateData = { id: selectedTaskId, ...values };
      updateTask(updateData, {
        onSuccess(data) {
          toast({
            title: t(
              "pages.task_list_open.components.drawer_task.success_request_edit_message"
            ),
          });

          refetchGetTasks();
          refetchGetTaskById();
          updateIsDrawerEditOpen(false);
        },
        onError(error) {
          toast({
            title: t(
              "pages.task_list_open.components.drawer_task.error_request_edit_message"
            ),
            status: "error",
          });
        },
      });

      return;
    }

    createTask(values, {
      onSuccess(data) {
        toast({
          title: t(
            "pages.task_list_open.components.drawer_task.success_request_new_message"
          ),
        });

        refetchGetTasks();
        updateIsDrawerEditOpen(false);
      },
      onError(error) {
        toast({
          title: t(
            "pages.task_list_open.components.drawer_task.error_request_new_message"
          ),
          status: "error",
        });
      },
    });
  };

  const handleClose = () => {
    if (selectedTaskId) updateSelectedTaskId(0);

    updateIsDrawerEditOpen(false);
  };

  return (
    <Drawer
      title={
        selectedTaskId
          ? t("pages.task_list_open.components.drawer_task.edit_task_title")
          : t("pages.task_list_open.components.drawer_task.new_task_title")
      }
      onConfirm={() => formRef.current?.handleSubmit()}
      isOpen={isDrawerOpen}
      onClose={handleClose}
      onConfirmLoading={createTaskLoading ?? updateTaskLoading}
    >
      <Preloader isLoading={getTaskLoading}>
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
                      {t(
                        "pages.task_list_open.components.drawer_task.input_name"
                      )}
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder={t(
                        "pages.task_list_open.components.drawer_task.input_name"
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
                        "pages.task_list_open.components.drawer_task.input_description"
                      )}
                    </FormLabel>
                    <Textarea
                      {...field}
                      rows={8}
                      resize="none"
                      placeholder={t(
                        "pages.task_list_open.components.drawer_task.input_description"
                      )}
                    />
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <FormLabel mt="2">
                {t("pages.task_list_open.components.drawer_task.input_items")}
              </FormLabel>
              <ItemInputContent>
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <>
                      {values.items.map((_, index) => (
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
                                    "pages.task_list_open.components.drawer_task.input_item_name"
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
                            title={t("generic.button_delete")}
                          />
                        </ItemContent>
                      ))}

                      <Button
                        onClick={() => arrayHelpers.push("")}
                        colorScheme="green"
                      >
                        {t(
                          "pages.task_list_open.components.drawer_task.button_add_item"
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
