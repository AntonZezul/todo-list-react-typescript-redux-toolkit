import { Box, Card, Grid, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { FC } from 'react';
import { ITodo } from '../models/ITodo';
import TodoItem from './TodoItem';
import TodoModal from './modals/TodoModal';
import { useAppDispatch } from '../hooks/redux';
import { deleteTodo } from '../store/actionCreators/TodoActionCreators';
import { ITodoItem } from '../models/ITodoItem';

interface ITodoCardProps {
  todo: ITodo;
  todoItems: ITodoItem[];
}

const TodoCard: FC<ITodoCardProps> = ({ todo, todoItems }) => {
  const dispatch = useAppDispatch();

  const deleteTodoHandler = () => {
    dispatch(deleteTodo(todo.id));
  };
  return (
    <Grid item xs={8} sm={6} md={4}>
      <Card variant='outlined'>
        <Box
          marginY={2}
          marginLeft={3}
          display='flex'
          justifyContent='space-between'>
          <Typography sx={{ fontSize: 16 }} gutterBottom>
            {todo.title}
          </Typography>
          <ClearIcon
            onClick={deleteTodoHandler}
            sx={{ marginRight: 3, cursor: 'pointer' }}
            color='error'
          />
        </Box>
        <Grid
          sx={{ paddingX: 3 }}
          container
          direction='column'
          justifyContent='center'
          marginBottom={2}>
          {todoItems.length ? (
            todoItems?.map((item) => {
              return <TodoItem todoItem={item} key={item.id} />;
            })
          ) : (
            <Typography sx={{ fontSize: 16 }} gutterBottom>
              No todo tasks
            </Typography>
          )}
        </Grid>
        <TodoModal todo={todo} />
      </Card>
    </Grid>
  );
};

export default TodoCard;
