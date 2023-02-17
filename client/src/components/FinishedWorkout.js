import { Typography } from '@mui/material';
import { MyConsumer } from './MyContext';
import { Card, CardContent } from '@mui/material';

function FinishedWorkout() {
  return (
    <MyConsumer>
      {(context) => (
        <div>
          <Typography sx={{ textAlign: 'center', margin: '5%' }} variant="h1">
            You did it!
          </Typography>
          {context.deloads.length > 0 && (
            <Card variant="contained" sx={{ maxWidth: '50%', margin: '2%' }}>
              <CardContent>
                <Typography variant="h4">
                  You didn't quite hit your weight on{' '}
                  {context.user.deloads.length === 1 ? 'a lift' : 'some lifts'}{' '}
                  today:
                </Typography>
                {context.deloads.map((liftId) => (
                  <Typography variant="h5" key={liftId}>
                    Your max weight for{' '}
                    {context.lifts
                      .filter((lift) => lift.id === liftId)[0]
                      .name.toLowerCase()}{' '}
                    has gone down 10%.
                  </Typography>
                ))}
              </CardContent>
            </Card>
          )}
          {context.increases.length > 0 && (
            <Card variant="contained" sx={{ maxWidth: '50%', margin: '2%' }}>
              <CardContent>
                <Typography variant="h4">You're moving up!</Typography>
                {context.increases.map((liftId) => (
                  <Typography variant="h5" key={liftId}>
                    Your max for{' '}
                    {context.lifts
                      .filter((lift) => lift.id === liftId)[0]
                      .name.toLowerCase()}{' '}
                    is going up!
                  </Typography>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </MyConsumer>
  );
}
export default FinishedWorkout;
