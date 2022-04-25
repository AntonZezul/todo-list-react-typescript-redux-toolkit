import { Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import TodoCard from '../components/TodoCard';
import CreateTodoModal from '../components/modals/CreateTodoModal';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { ITodo } from '../models/ITodo';
import { getTodos } from '../store/actionCreators/TodoActionCreators';
import { getTodoItems } from '../store/actionCreators/TodoItemActionCreators';
import SpinnerLoading from '../components/SpinnerLoading';
import { ErrorAlert } from '../components/ErrorAlert';

export default function Home() {
  const { filteredTodos, isLoading, error } = useAppSelector(
    (state) => state.todoReducer
  );
  const { todoItems } = useAppSelector((state) => state.todoItemReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodos());
    dispatch(getTodoItems());
  }, []);
  return (
    <>
      {error && <ErrorAlert message={error} />}
      <Container sx={{ marginY: 5 }}>
        <Grid
          container
          spacing={5}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {isLoading ? (
            <SpinnerLoading />
          ) : (
            filteredTodos.map((todo: ITodo) => {
              return (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  todoItems={todoItems.filter(
                    (item) => item.todoId === todo.id
                  )}
                />
              );
            })
          )}
          <CreateTodoModal />
        </Grid>
      </Container>
    </>
  );
}
