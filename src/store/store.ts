import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducers/todo/TodoSlice';
import todoItemReducer from './reducers/todo/TodoItemSlice';

const rootReducer = combineReducers({
  todoReducer,
  todoItemReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
