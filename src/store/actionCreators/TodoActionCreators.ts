import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo } from '../../models/ITodo';
import { TodoService } from '../../services/todo.service';

export const getTodos = createAsyncThunk(
  'todo/getAllTodo',
  async (_, thunkAPI) => {
    try {
      const response = await TodoService.getAllTodos();
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('You cannot Get Todos for some reason');
    }
  }
);

export const getOneTodo = createAsyncThunk(
  'todo/getOneTodo',
  async (id: number, thunkAPI) => {
    try {
      const response = await TodoService.getOneTodo(id);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('You cannot Get Todo for some reason');
    }
  }
);

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async (todo: ITodo, thunkAPI) => {
    try {
      const response = await TodoService.createTodo(todo);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('You cannot Create Todo for some reason');
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id: number, thunkAPI) => {
    try {
      await TodoService.deleteTodo(id);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue('You cannot Delete Todo for some reason');
    }
  }
);
