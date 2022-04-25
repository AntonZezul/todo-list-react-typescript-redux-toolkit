import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createTodo } from '../../store/actionCreators/TodoActionCreators';

interface ICreateTodoFormProps {
  handleClose: VoidFunction;
}

interface IFormValues {
  todoTitle: string;
}

const validationSchema = yup.object({
  todoTitle: yup.string().required('Todo title is required'),
});

const CreateTodoForm: FC<ICreateTodoFormProps> = ({ handleClose }) => {
  const { todos } = useAppSelector((state) => state.todoReducer);
  const dispatch = useAppDispatch();
  const initialValues: IFormValues = {
    todoTitle: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        createTodo({
          id: todos[todos.length - 1].id + 1,
          title: values.todoTitle,
        })
      );
      handleClose();
    },
  });

  return (
    <>
      <Typography id='spring-modal-title' variant='h6' component='h2'>
        Create new todo
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          marginTop: 20,
          marginBottom: 20,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <TextField
          sx={{ width: '75%', marginBottom: 3 }}
          id='todoTitle'
          name='todoTitle'
          label='Todo title'
          value={formik.values.todoTitle}
          onChange={formik.handleChange}
          error={formik.touched.todoTitle && Boolean(formik.errors.todoTitle)}
          helperText={formik.touched.todoTitle && formik.errors.todoTitle}
        />
        <Button
          color='primary'
          variant='contained'
          type='submit'
          sx={{ width: 200 }}>
          Create Todo
        </Button>
      </form>
    </>
  );
};

export default CreateTodoForm;
