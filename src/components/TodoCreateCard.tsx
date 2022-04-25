import { Card, Grid } from '@mui/material';
import { FC } from 'react';

import AddIcon from '@mui/icons-material/Add';

interface ITodoCreateCardProps {
  handleOpen: VoidFunction;
}

const TodoCreateCard: FC<ITodoCreateCardProps> = ({ handleOpen }) => {
  return (
    <Grid item xs={2} sm={4} md={4} style={{ height: 300 }}>
      <Card
        onClick={handleOpen}
        variant='outlined'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          cursor: 'pointer',
        }}>
        <AddIcon color='primary' sx={{ width: 150, height: 150 }} />
      </Card>
    </Grid>
  );
};

export default TodoCreateCard;
