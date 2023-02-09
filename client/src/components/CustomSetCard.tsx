import React from 'react'
import { Card, Typography } from '@mui/material';

interface CustomSetCardProps {
  liftName: string,
  index: string,
  position: string,
  weight: string,
  reps: string,
  amrap: boolean
  selected: boolean
}


function CustomSetCard({
  liftName,
  index,
  position,
  weight,
  reps,
  amrap,
  selected,
}: CustomSetCardProps) {
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
