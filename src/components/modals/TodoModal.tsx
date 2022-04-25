import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useSpring, animated } from '@react-spring/web';
import TodoItemsList from '../TodoItemsList';
import CreateTodoItemForm from '../forms/CreateTodoItemForm';
import { ITodo } from '../../models/ITodo';
import { useAppSelector } from '../../hooks/redux';
import SpinnerLoading from '../SpinnerLoading';
import TodoItemSearchBar from '../TodoItemSearchBar';
import { ErrorAlert } from '../ErrorAlert';

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

interface ITodoModalProps {
  todo: ITodo;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 720,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

const TodoModal: React.FC<ITodoModalProps> = ({ todo }) => {
  const { todoItems, filteredTodoItems, isLoading, error } = useAppSelector(
    (state) => state.todoItemReducer
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ marginLeft: 3, marginBottom: 3 }}
        variant='outlined'>
        Open Todo
      </Button>

      <Modal
        aria-labelledby='spring-modal-title'
        aria-describedby='spring-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style}>
            {error && <ErrorAlert message={error} />}
            <TodoItemSearchBar />
            {isLoading ? (
              <SpinnerLoading />
            ) : (
              <TodoItemsList
                todo={todo}
                todoItems={todoItems.filter((item) => item.todoId === todo.id)}
                filteredTodoItems={filteredTodoItems.filter(
                  (item) => item.todoId === todo.id
                )}
              />
            )}
            <CreateTodoItemForm todo={todo} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TodoModal;
