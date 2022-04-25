import { Box, Button } from '@mui/material';
import { FC, useState } from 'react';
import { ITodoItem } from '../models/ITodoItem';

interface ITodoItemFilterProps {
  todoItems: ITodoItem[] | undefined;
  updateTodo: (arg: ITodoItem[]) => void;
}
interface IButton {
  id: number;
  title: string;
  type: string;
}

const buttons: IButton[] = [
  { id: 1, title: 'All', type: 'all' },
  { id: 2, title: 'Completed', type: 'completed' },
  { id: 3, title: 'Uncompleted', type: 'uncompleted' },
];

const TodoItemFilter: FC<ITodoItemFilterProps> = ({
  todoItems,
  updateTodo,
}) => {
  const [active, setActive] = useState<number>(buttons[0].id);

  const btnActiveHandler = (button: IButton) => {
    setActive(button.id);
    switch (button.type) {
      case 'all':
        allTodos();
        break;
      case 'completed':
        completedTodos();
        break;
      case 'uncompleted':
        uncompletedTodos();
        break;

      default:
        break;
    }
  };
  const allTodos = () => todoItems && updateTodo(todoItems);

  const completedTodos = () =>
    todoItems && updateTodo(todoItems.filter((item) => item.completed));

  const uncompletedTodos = () =>
    todoItems && updateTodo(todoItems.filter((item) => !item.completed));

  return (
    <Box
      width='50%'
      marginBottom={2}
      display='flex'
      alignItems='center'
      justifyContent='space-between'>
      {buttons.map((button) => {
        const { id, title } = button;
        return (
          <Button
            onClick={() => btnActiveHandler(button)}
            key={id}
            color={`${active === id ? 'success' : 'warning'}`}>
            {title}
          </Button>
        );
      })}
    </Box>
  );
};
export default TodoItemFilter;
