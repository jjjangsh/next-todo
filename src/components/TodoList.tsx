"use client";

import { todoService } from "@/services/todoService";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

type TabType = "all" | "active" | "completed";

const TodoList = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
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

  const filteredTodos = todos?.filter((todo) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return !todo.completed;
    if (activeTab === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="flex justify-center px-20">
      <div className="text-center bg-white border-2 w-full max-w-[1024px] mt-20 rounded-lg">
        <h1 className="bg-green-600 border-2 border-b-amber-50 py-2 font-bold">
          Baro Todo List
        </h1>

        <TodoForm />

        <div className="flex border-b mb-4 bg-amber-50">
          <button
            className={`py-2 px-4 ${
              activeTab === "all"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("all")}
          >
            모두
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "active"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("active")}
          >
            미완료
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "completed"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            완료됨
          </button>
        </div>

        {filteredTodos && filteredTodos.length > 0 ? (
          <ul>
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 p-4">
            {activeTab === "all"
              ? "Todo를 추가해보세요!"
              : activeTab === "active"
              ? "Todo를 전부 완료했어요!"
              : "Todo를 얼른 완료해볼까요?"}
          </p>
        )}

        {todos && todos.length > 0 && (
          <div className="mt-4 text-sm text-gray-500">
            전체: {todos.length}개 / 미완료:{" "}
            {todos.filter((todo) => !todo.completed).length}개 / 완료:{" "}
            {todos.filter((todo) => todo.completed).length}개
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
