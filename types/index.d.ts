declare type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

declare type TodoCardProps = {
  details: Todo;
  onDelete: (id: string) => void;
  onComplete: (id: string, completed: boolean) => void;
};

declare type CreateTodo = {
  title: string;
  description: string;
};
