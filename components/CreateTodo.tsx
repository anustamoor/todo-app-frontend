"use client";

import React, { useState } from "react";
import DrawerForm from "@/components/DrawerForm";
import TodoForm from "./TodoForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@/api/todoAPI";
import { useToast } from "./ui/use-toast";

const CreateTodo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const mutationCreateTodo = useMutation({
    mutationFn: createTodo,
    onSuccess: (resp) => {
      queryClient.refetchQueries({ queryKey: ["todos"] });
      toast({
        variant: "default",
        title: "Todo added",
        description: resp.message,
        duration: 3000,
      });
      setIsOpen(false);
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
  return (
    <DrawerForm
      key={"add-todo"}
      title="Add Todo"
      trigger="Add Todo"
      description="Use this form to quickly add a new task to your to-do list. Provide a clear title, set a priority level, and optionally include a due date or any additional notes. Stay organized by keeping track of everything you need to accomplish."
      isOpen={isOpen}
    >
      <TodoForm
        onSubmit={(data: CreateTodo) => mutationCreateTodo.mutate(data)}
      />
    </DrawerForm>
  );
};

export default CreateTodo;
