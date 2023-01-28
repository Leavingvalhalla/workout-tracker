import { Card, Typography } from '@mui/material';

function CustomRepCard({ liftName, index, position, weight, reps, amrap }) {
  return (
    <Card>
      <Typography>{liftName}</Typography>
      <Typography>Day: {index}</Typography>
      <Typography>Order: {position}</Typography>
      <Typography>% of max:{weight}</Typography>
      <Typography>{reps} reps</Typography>
      <Typography>amrap: {amrap}</Typography>
    </Card>
  );
}

export default CustomRepCard;
