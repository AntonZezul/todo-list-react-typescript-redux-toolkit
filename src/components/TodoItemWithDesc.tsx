import { Box, Grid, Typography, Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { FC } from 'react';
import { ITodoItem } from '../models/ITodoItem';
import TodoItemCheckbox from './TodoItemCheckbox';
import { useAppDispatch } from '../hooks/redux';
import { deleteTodoItem } from '../store/actionCreators/TodoItemActionCreators';

interface ITodoItemProps {
  todoItem: ITodoItem;
}

const TodoItemWithDesc: FC<ITodoItemProps> = ({ todoItem }) => {
  const dispatch = useAppDispatch();
  const deleteHandler = () => {
    dispatch(deleteTodoItem(todoItem.id));
  };
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Paper
        variant='elevation'
        elevation={6}
        sx={{ border: '1px solid black', marginY: 1 }}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Box display='flex' alignItems='center'>
            <TodoItemCheckbox todoItem={todoItem} />
            <Typography sx={{ fontSize: 14 }}>{todoItem.title}</Typography>
          </Box>
          <Box display='flex' alignItems='center' marginRight={3}>
            {todoItem.deadline ? (
              <Typography sx={{ fontSize: 12, marginRight: 1 }}>
                Deadline: {todoItem.deadline.toString().split('T')[0]}
              </Typography>
            ) : (
              ''
            )}
            <ClearIcon
              onClick={deleteHandler}
              sx={{ cursor: 'pointer', marginRight: 2 }}
              color='error'
            />
          </Box>
        </Box>
        <Typography
          sx={{ fontSize: 14, marginLeft: 5, marginY: 1.5, maxWidth: 400 }}>
          {todoItem.description}
        </Typography>
        <Typography
          sx={{ fontSize: 12, marginLeft: 5, marginY: 1.5, maxWidth: 400 }}>
          Created: {todoItem.createdAt.toString().split('T')[0]}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default TodoItemWithDesc;
