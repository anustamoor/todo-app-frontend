"use client";

import React, { FC, useState } from "react";
import { completeTodo, deleteTodo, getTodos } from "@/api/todoAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TodoCard from "./TodoCard";
import { toast } from "./ui/use-toast";

const TodoList = () => {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const mutationComplete = useMutation({
    mutationFn: completeTodo,
    onSuccess: (resp, data) => {
      3;
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        variant: "default",
        title: `Todo ${data.completed ? "Completed" : "Uncompleted"}`,
        description: resp.message,
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error adding todo",
        description: error.message,
        duration: 3000,
      });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (resp) => {
      3;
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        variant: "default",
        title: "Todo Deleted",
        description: resp.message,
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error adding todo",
        description: error.message,
        duration: 3000,
      });
    },
  });

  const handleDelete = (id: string) => {
    mutationDelete.mutate(id);
  };

  const handleComplete = (id: string, completed: boolean) => {
    mutationComplete.mutate({ id, completed });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  if (todos.length === 0) return <p>No todos</p>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-32">
      {todos.map((todo, index) => (
        <TodoCard
          key={index}
          details={todo}
          onDelete={handleDelete}
          onComplete={handleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
