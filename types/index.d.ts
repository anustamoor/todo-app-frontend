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
  id?: string;
  title: string;
  description: string;
  completed?: boolean;
};

declare type EditProps = {
  data: Todo
}