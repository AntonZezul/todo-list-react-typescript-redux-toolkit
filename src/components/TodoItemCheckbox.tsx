import { Checkbox } from '@mui/material';
import React, { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { ITodoItem } from '../models/ITodoItem';
import { updateTodoItem } from '../store/actionCreators/TodoItemActionCreators';

interface ITodoItemCheckboxProps {
  todoItem: ITodoItem;
}

const TodoItemCheckbox: FC<ITodoItemCheckboxProps> = ({ todoItem }) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(todoItem.completed);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const clickHandler = (): void => {
    dispatch(updateTodoItem({ ...todoItem, completed: !checked }));
  };

  return (
    <Checkbox
      checked={todoItem.completed}
      onChange={changeHandler}
      onClick={clickHandler}
    />
  );
};

export default TodoItemCheckbox;
