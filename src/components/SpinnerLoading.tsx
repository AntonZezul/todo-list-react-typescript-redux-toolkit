import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function SpinnerLoading() {
  const style = {
    zIndex: '1',
    display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  };
  return (
    <Box sx={style}>
      <CircularProgress disableShrink />
    </Box>
  );
}
