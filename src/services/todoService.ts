import todoApi from "@/lib/axiosInstance";
import { Todo } from "@/types/todo";

export const todoService = {
  async getTodos(): Promise<Todo[]> {
    const res = await todoApi.get<Todo[]>("/todos");
    return res.data;
  },

  async createTodo(title: string): Promise<Todo> {
    const res = await todoApi.post<Todo>("/todos", {
      title,
      id: Date.now().toString(),
      completed: false,
    });
    return res.data;
  },
};
