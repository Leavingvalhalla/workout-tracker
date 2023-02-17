import { Card, Typography } from '@mui/material';

function CustomSetCard({
  liftName,
  index,
  position,
  weight,
  reps,
  amrap,
  selected,
}) {
  return (
    <Card
      variant="outlined"
      sx={
        selected
          ? { width: '200px', margin: '2px', color: '#aa2c2d' }
          : { width: '200px', margin: '2px' }
      }
    >
      <Typography>{liftName}</Typography>
      <Typography>Day: {index}</Typography>
      <Typography>Order: {position}</Typography>
      <Typography>% of max:{weight}</Typography>
      <Typography>{reps} reps</Typography>
      {amrap && <Typography>AMRAP</Typography>}
    </Card>
  );
}

export default CustomSetCard;
