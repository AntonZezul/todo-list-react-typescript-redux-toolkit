import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodoItem } from '../../../models/ITodoItem';
import {
  getTodoItems,
  createTodoItem,
  deleteTodoItem,
  updateTodoItem,
} from '../../actionCreators/TodoItemActionCreators';

interface TodoItemsState {
  todoItems: ITodoItem[];
  filteredTodoItems: ITodoItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodoItemsState = {
  todoItems: [],
  filteredTodoItems: [],
  isLoading: false,
  error: null,
};

export const todoItemsSlice = createSlice({
  name: 'todoItems',
  initialState,
  reducers: {
    searchTodoItems: (state, action: PayloadAction<string>) => {
      state.filteredTodoItems = state.todoItems.filter((item) =>
        item.title.toLowerCase().includes(action.payload.toLowerCase())
      );

      state.isLoading = false;
    },
  },
  extraReducers: {
    [getTodoItems.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getTodoItems.fulfilled.type]: (
      state,
      action: PayloadAction<ITodoItem[]>
    ) => {
      state.isLoading = false;
      state.todoItems = action.payload;
      state.filteredTodoItems = state.todoItems;
      state.error = null;
    },
    [getTodoItems.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [createTodoItem.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createTodoItem.fulfilled.type]: (
      state,
      action: PayloadAction<ITodoItem>
    ) => {
      state.isLoading = false;
      state.todoItems.push(action.payload);
      state.filteredTodoItems = state.todoItems;
      state.error = null;
    },
    [createTodoItem.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [updateTodoItem.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateTodoItem.fulfilled.type]: (
      state,
      action: PayloadAction<ITodoItem>
    ) => {
      let todoItemIndex = state.todoItems.findIndex(
        (item) => item.id === action.payload.id
      );
      let filteredTodoItemIndex = state.todoItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.todoItems[todoItemIndex] = action.payload;
      state.filteredTodoItems[filteredTodoItemIndex] = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [updateTodoItem.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteTodoItem.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteTodoItem.fulfilled.type]: (state, action: PayloadAction<number>) => {
      state.todoItems = state.todoItems.filter(
        (todoItem) => todoItem.id !== action.payload
      );
      state.filteredTodoItems = state.todoItems;
      state.isLoading = false;
      state.error = null;
    },
    [deleteTodoItem.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default todoItemsSlice.reducer;
