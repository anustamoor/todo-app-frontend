export const getTodos = async () => {
  try {
    const response = await fetch("http://localhost:5000/todos", {
      mode: "cors",
      cache: "no-store",
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    const rep: Todo[] = await response.json();
    return rep;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch todo");
  }
};

export const completeTodo = async ({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) => {
  try {
    const response = await fetch(`http://localhost:5000/todos/complete/${id}`, {
      mode: "cors",
      cache: "no-store",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: completed }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to complete todo");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create todo");
  }
};

export const createTodo = async (payload: CreateTodo) => {
  try {
    const response = await fetch("http://localhost:5000/todos", {
      mode: "cors",
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create todo");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create todo");
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
      mode: "cors",
      cache: "no-store",
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete todo");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete todo");
  }
};
