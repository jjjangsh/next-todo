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
    <div className="flex justify-center w-full py-4 bg-sky-500">
      <form className="flex gap-2 w-[70%]" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo를 입력하세요"
          disabled={createMutation.isPending}
          className="p-1 bg-gray-50 border-1 text-black border-white rounded-lg flex-1"
        />
        <button
          type="submit"
          className="hover:bg-black hover:text-amber-50 px-2 rounded-lg border-1 border-black bg-amber-200 text-black cursor-pointer disabled:cursor-not-allowed"
          disabled={createMutation.isPending || !title.trim()}
        >
          {createMutation.isPending ? "처리 중" : "추가"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
