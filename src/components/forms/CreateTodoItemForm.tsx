import { Box, Button, TextField, Typography, Checkbox } from '@mui/material';
import * as React from 'react';
import { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ITodo } from '../../models/ITodo';
import { createTodoItem } from '../../store/actionCreators/TodoItemActionCreators';

interface IFormValues {
  title: string;
  description: string;
  date: Date | null;
}

interface ICreateTodoItemFormProps {
  todo: ITodo;
}

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string(),
});

const CreateTodoItemForm: FC<ICreateTodoItemFormProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const { todoItems } = useAppSelector((state) => state.todoItemReducer);
  const initialValues: IFormValues = {
    title: '',
    description: '',
    date: null,
  };
  const [datePickerValue, setDatePickerValue] = React.useState<Date | null>(
    new Date()
  );
  const [isOnDeadlineCheckBox, setIsOnDeadlineCheckBox] =
    useState<boolean>(false);

  const handleChange = (newValue: Date | null) => {
    setDatePickerValue(newValue);
    formik.setFieldValue('date', newValue);
  };

  const checkboxHandler = () => {
    formik.setFieldValue(
      'date',
      !isOnDeadlineCheckBox ? datePickerValue : null
    );
    setIsOnDeadlineCheckBox((prev) => !prev);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        createTodoItem({
          id: todoItems[todoItems.length - 1].id + 1,
          createdAt: new Date(),
          completed: false,
          title: values.title,
          deadline: values.date,
          description: values.description,
          todoId: todo.id,
        })
      );
      formik.setValues(initialValues);
      formik.touched.title = false;
    },
  });

  return (
    <>
      <Box border='0.5px solid black' marginY={3} />
      <Typography id='spring-modal-title' variant='h6' component='h2'>
        Create new todo task
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
          id='title'
          name='title'
          label='Title'
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          id='description'
          name='description'
          placeholder='Description'
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          style={{ width: '75%', marginBottom: 30 }}
        />
        <Box display='flex' alignItems='center' marginBottom={3}>
          <Typography sx={{ fontSize: 18 }}>Deadline</Typography>
          <Checkbox checked={isOnDeadlineCheckBox} onChange={checkboxHandler} />
        </Box>
        {isOnDeadlineCheckBox && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label='Date'
                inputFormat='MM/dd/yyyy'
                value={datePickerValue}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        )}
        <Button
          color='primary'
          variant='contained'
          type='submit'
          sx={{ width: 200, marginTop: 3 }}>
          Create Todo
        </Button>
      </form>
    </>
  );
};

export default CreateTodoItemForm;
