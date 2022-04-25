import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITodoItem } from '../../models/ITodoItem';
import { TodoItemService } from '../../services/todoItem.service';

export const getTodoItems = createAsyncThunk(
  'todo/getAllTodoItems',
  async (_, thunkAPI) => {
    try {
      const response = await TodoItemService.getAllTodoItems();
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'You cannot Get TodoItems for some reason'
      );
    }
  }
);

export const createTodoItem = createAsyncThunk(
  'todo/createTodoItem',
  async (todoItem: ITodoItem, thunkAPI) => {
    try {
      const response = await TodoItemService.createTodoItem(todoItem);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'You cannot Create TodoItem for some reason'
      );
    }
  }
);

export const deleteTodoItem = createAsyncThunk(
  'todo/deleteTodoItem',
  async (id: number, thunkAPI) => {
    try {
      await TodoItemService.deleteTodoItem(id);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'You cannot Delete TodoItem for some reason'
      );
    }
  }
);

export const updateTodoItem = createAsyncThunk(
  'todo/updateTodoItem',
  async (todoItem: ITodoItem, thunkAPI) => {
    try {
      const response = await TodoItemService.updateTodoItem(todoItem);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'You cannot Update TodoItem for some reason'
      );
    }
  }
);
