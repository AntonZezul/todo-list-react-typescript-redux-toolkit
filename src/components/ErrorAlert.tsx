import { Alert } from '@mui/material';
import { FC } from 'react';

interface IErrorAlertProps {
  message: string;
}

export const ErrorAlert: FC<IErrorAlertProps> = ({ message }) => {
  return <Alert severity='error'>{message}</Alert>;
};
