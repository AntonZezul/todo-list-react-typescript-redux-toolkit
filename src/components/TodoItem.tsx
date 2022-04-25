import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { ITodoItem } from '../models/ITodoItem';
import TodoItemCheckbox from './TodoItemCheckbox';

interface ITodoItemProps {
  todoItem: ITodoItem;
}

const TodoItem: FC<ITodoItemProps> = ({ todoItem }) => {
  return (
    <Grid
      item
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Box display='flex' alignItems='center'>
        <TodoItemCheckbox todoItem={todoItem} />
        <Typography sx={{ fontSize: 14 }}>{todoItem.title}</Typography>
      </Box>
      {todoItem.deadline ? (
        <Typography sx={{ fontSize: 12 }}>
          Deadline: {todoItem.deadline.toString().split('T')[0]}
        </Typography>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default TodoItem;
