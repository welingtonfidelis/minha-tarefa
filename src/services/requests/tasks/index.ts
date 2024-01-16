import { useMutation, useQuery } from "react-query";
import { taskDB } from "../../../db/repositories/task";
import { CreateTaskData, FindTaskParam } from "../../../db/repositories/task/types";

// ===== MUTATES ===== //
export const useCreateTask = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: CreateTaskData) => taskDB.create(data),
  });

  return { mutate, isLoading };
};

// ===== QUERIES ===== //
export const useGetTasks = (params: FindTaskParam) => {
  const getQueryKey = () => ["tasks"];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), () =>
    taskDB.find(params)
  );

  return { getQueryKey, refetch, data, isLoading };
};
