"use client";

import { todoService } from "@/services/todoService";
import { Todo } from "@/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (params: { id: string; completed: boolean }) =>
      todoService.updateTodo(params.id, params.completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: todoService.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleToggle = () => {
    updateMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };

  return (
    <li className="bg-white flex justify-center">
      <div className="flex gap-2 my-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={updateMutation.isPending}
          className="w-5"
        />
        <span
          className={`${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </span>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className={`text-black hover:text-black text-sm text-center flex justify-center items-center border-2 rounded-lg px-1 ${
            deleteMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {deleteMutation.isPending ? "처리 중" : "X"}
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
