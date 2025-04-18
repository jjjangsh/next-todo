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
    <li className="">
      <div className="">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={updateMutation.isPending}
          className=""
        />
        <span
          className={`${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={handleDelete}
        disabled={deleteMutation.isPending}
        className={`text-yellow-500 hover:text-red-700 ${
          deleteMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {deleteMutation.isPending ? "처리 중" : "삭제"}
      </button>
    </li>
  );
};

export default TodoItem;
