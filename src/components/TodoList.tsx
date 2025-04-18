"use client";

import { todoService } from "@/services/todoService";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const TodoList = () => {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todoService.getTodos,
  });
  if (isLoading) return <div>목록을 가져오는 중입니다...</div>;
  if (error) return <div>목록을 가져오는 중 오류가 발생했습니다.</div>;
  return (
    <div>
      <h1>Baro Todo List</h1>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            <span
              className={todo.completed ? "line-through text-gray-500" : ""}
            >
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
      {todos?.length === 0 && (
        <p>목록이 비어있습니다. 할 일을 추가해 보세요!</p>
      )}
    </div>
  );
};

export default TodoList;
