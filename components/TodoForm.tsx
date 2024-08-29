"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";

type TodoFormProps = {
  data?: Todo;
  onSubmit: (data: CreateTodo) => void;
};

const TodoForm: FC<TodoFormProps> = (props) => {
  const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string(),
    completed: z.boolean().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: props.data
      ? {
          ...props.data,
        }
      : {
          title: "",
          description: "",
        },
  });

  useEffect(() => {
    if (props.data && props.data.id) {
      form.setValue("id", props.data.id);
      form.setValue("completed", props.data.completed);
    }
  }, [props.data]);

  const onSubmit = (data: any) => {
    props.onSubmit(data);
  };

  return (
    <div className="px-5 py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="default" className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TodoForm;
