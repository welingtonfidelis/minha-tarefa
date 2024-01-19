import { useMutation, useQuery } from "react-query";
import { taskDB } from "../../../db/repositories/task";
import {
  CreateTaskData,
  FindTaskParam,
  UpdateTaskData,
} from "../../../db/repositories/task/types";

// ===== MUTATES ===== //
export const useCreateTask = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: CreateTaskData) => taskDB.create(data),
  });

  return { mutate, isLoading };
};

export const useUpdateTask = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: UpdateTaskData) => taskDB.update(data),
  });

  return { mutate, isLoading };
};

// ===== QUERIES ===== //
export const useGetTasks = (params: FindTaskParam) => {
  const getQueryKey = () => ["tasks", params];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), () =>
    taskDB.find(params)
  );

  return { getQueryKey, refetch, data, isLoading };
};

export const useGetTaskById = (id: number) => {
  const getQueryKey = () => ["task", id];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), () =>
    taskDB.findById(id)
  );

  return { getQueryKey, refetch, data, isLoading };
};
