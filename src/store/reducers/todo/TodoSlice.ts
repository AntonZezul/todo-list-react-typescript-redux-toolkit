import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../../../models/ITodo';
import {
  createTodo,
  getOneTodo,
  getTodos,
  deleteTodo,
} from '../../actionCreators/TodoActionCreators';

interface TodosState {
  todos: ITodo[];
  filteredTodos: ITodo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  filteredTodos: [],
  isLoading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    searchTodo: (state, action: PayloadAction<string>) => {
      state.filteredTodos = state.todos.filter((item) => {
        return item
          ? item.title.toLowerCase().includes(action.payload.toLowerCase())
          : '';
      });
      state.isLoading = false;
    },
  },
  extraReducers: {
    [getTodos.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getTodos.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
      state.isLoading = false;
      state.todos = action.payload;
      state.filteredTodos = state.todos;
      state.error = null;
    },
    [getTodos.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getOneTodo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getOneTodo.fulfilled.type]: (state, action: PayloadAction<number>) => {
      const id = state.todos.findIndex((todo) => todo.id === action.payload);
      state.isLoading = false;
      state.todos[id] = state.todos[action.payload];
      state.error = null;
    },
    [getOneTodo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [createTodo.fulfilled.type]: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
      state.filteredTodos = state.todos;
      state.error = null;
    },
    [createTodo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    [deleteTodo.fulfilled.type]: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.filteredTodos = state.todos;
      state.error = null;
    },
    [deleteTodo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export default todoSlice.reducer;
