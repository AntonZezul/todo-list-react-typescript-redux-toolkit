export interface ITodoItem {
  id: number;
  title: string;
  description: string;
  deadline: Date | null;
  completed: boolean;
  createdAt: Date;
  todoId: number;
}
