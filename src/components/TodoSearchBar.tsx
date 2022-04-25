import SearchIcon from '@mui/icons-material/Search';
import React, { FC, useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useAppDispatch } from '../hooks/redux';
import { todoSlice } from '../store/reducers/todo/TodoSlice';

const TodoSearchBar: FC = () => {
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(todoSlice.actions.searchTodo(value));
  }, [value]);

  const searchHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.currentTarget.value);
  };

  return (
    <Box display='flex' alignItems='center'>
      <SearchIcon />
      <TextField
        id='outlined-basic'
        placeholder='Search…'
        onChange={searchHandler}
        variant='filled'
        color='info'
        label='Search'
      />
    </Box>
  );
};
export default TodoSearchBar;
