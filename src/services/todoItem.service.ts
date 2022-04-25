import { AxiosResponse } from 'axios';
import http from '../http';
import { ITodoItem } from '../models/ITodoItem';

export const TodoItemService = {
  getAllTodoItems(): Promise<AxiosResponse<ITodoItem[]>> {
    return http.get<ITodoItem[]>('/todoItems');
  },
  createTodoItem(todoItem: ITodoItem): Promise<AxiosResponse<ITodoItem>> {
    return http.post<ITodoItem>('/todoItems', todoItem);
  },
  deleteTodoItem(id: number): Promise<AxiosResponse<number>> {
    return http.delete<number>(`/todoItems/${id}`);
  },
  updateTodoItem(todoItem: ITodoItem): Promise<AxiosResponse<ITodoItem>> {
    return http.put<ITodoItem>(`/todoItems/${todoItem.id}`, todoItem);
  },
};
