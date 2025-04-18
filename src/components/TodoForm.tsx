"use client";

import { todoService } from "@/services/todoService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (title: string) => todoService.createTodo(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요");
      return;
    }

    createMutation.mutate(title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요"
          disabled={createMutation.isPending}
        />
        <button
          type="submit"
          className="hover:bg-red-600 cursor-pointer disabled:cursor-not-allowed"
          disabled={createMutation.isPending || !title.trim()}
        >
          {createMutation.isPending ? "처리 중" : "추가하기"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
