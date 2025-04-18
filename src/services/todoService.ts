import todoApi from "@/lib/axiosInstance";
import { Todo } from "@/types/todo";

export const todoService = {
  async getTodo(): Promise<Todo[]> {
    const res = await todoApi.get<Todo[]>("/todos");
    return res.data;
  },
};
