"use client";

import { todoService } from "@/services/todoService";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

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

      <TodoForm />

      <ul>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      {todos?.length === 0 && (
        <p>목록이 비어있습니다. 할 일을 추가해 보세요!</p>
      )}
    </div>
  );
};

export default TodoList;
