import { AxiosResponse } from 'axios';
import http from '../http';
import { ITodo } from '../models/ITodo';

export const TodoService = {
  getAllTodos(): Promise<AxiosResponse<ITodo[]>> {
    return http.get<ITodo[]>('/todos');
  },
  getOneTodo(id: number): Promise<AxiosResponse<ITodo>> {
    return http.get<ITodo>(`/todos/${id}`);
  },
  createTodo(todo: ITodo): Promise<AxiosResponse<ITodo>> {
    return http.post<ITodo>('/todos', todo);
  },
  deleteTodo(id: number): Promise<AxiosResponse<number>> {
    return http.delete<number>(`/todos/${id}`);
  },
};
