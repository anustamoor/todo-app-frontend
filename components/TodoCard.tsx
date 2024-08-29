"use client";

import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditTodo } from "./EditTodo";

const TodoCard: FC<TodoCardProps> = ({ details, onDelete, onComplete }) => {
  const { id, title, description, completed } = details;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardContent>
          <p>Completed: {completed ? "Yes" : "No"}</p>
        </CardContent>
        <CardFooter className="flex justify-around py-2 px-0">
          <Button onClick={() => onDelete(id)} variant="destructive">
            Delete
          </Button>
          <Button
            onClick={() => onComplete(id, !completed)}
            variant={completed ? "secondary" : "default"}
          >
            {completed ? "Uncomplete" : "Complete"}
          </Button>
          <EditTodo data={details} />
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default TodoCard;
