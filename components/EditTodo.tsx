import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TodoForm from "./TodoForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./ui/use-toast";
import { editTodo } from "@/api/todoAPI";
import { FC } from "react";

export const EditTodo: FC<EditProps> = (props) => {
  const queryClient = useQueryClient();
  const mutationEdit = useMutation({
    mutationFn: editTodo,
    onSuccess: (resp, data) => {
      3;
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        variant: "default",
        title: `Todo Edit`,
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

  const handleEdit = (data: CreateTodo) => {
    // console.log(data)
    mutationEdit.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <TodoForm  onSubmit={(data) => handleEdit(data)} data={props.data} />
      </DialogContent>
    </Dialog>
  );
}
