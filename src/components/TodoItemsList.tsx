import { Grid, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { ITodo } from '../models/ITodo';
import { ITodoItem } from '../models/ITodoItem';
import TodoItemFilter from './TodoItemFilter';
import TodoItemWithDesc from './TodoItemWithDesc';

interface ITodoItemsList {
  todo: ITodo;
  todoItems: ITodoItem[];
  filteredTodoItems: ITodoItem[];
}

const TodoItemsList: FC<ITodoItemsList> = ({
  todo,
  todoItems,
  filteredTodoItems,
}) => {
  const [filteredTodo, setFilteredTodo] = useState<ITodoItem[] | undefined>(
    filteredTodoItems
  );

  const updateTodo = (todoItems: ITodoItem[]): void => {
    setFilteredTodo(todoItems);
  };
  return (
    <>
      {todoItems?.length ? (
        <TodoItemFilter todoItems={filteredTodoItems} updateTodo={updateTodo} />
      ) : (
        ''
      )}
      <Typography id='spring-modal-title' variant='h6' component='h2'>
        {todo?.title}
      </Typography>
      <Grid container id='spring-modal-description' sx={{ mt: 1 }}>
        {filteredTodoItems?.length ? (
          filteredTodoItems
            ?.filter((item) => filteredTodo?.includes(item))
            .map((item) => {
              return <TodoItemWithDesc todoItem={item} key={item.id} />;
            })
        ) : (
          <Typography sx={{ fontSize: 16 }} gutterBottom>
            No todo tasks
          </Typography>
        )}
      </Grid>
    </>
  );
};
export default TodoItemsList;
