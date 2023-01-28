import { Card, Typography } from '@mui/material';

function CustomRepCard({ liftName, index, position, weight, reps, amrap }) {
  return (
    <Card sx={{ width: '200px', margin: '2px' }}>
      <Typography>{liftName}</Typography>
      <Typography>Day: {index}</Typography>
      <Typography>Order: {position}</Typography>
      <Typography>% of max:{weight}</Typography>
      <Typography>{reps} reps</Typography>
      {amrap && <Typography>AMRAP</Typography>}
    </Card>
  );
}

export default CustomRepCard;
