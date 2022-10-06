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
            <Card>
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
            <Card>
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

// TODO: Style this page, at least a little bit.

// TODO: weigh pros and cons of actually listing the exact weights. Probably not too bad if you just select the whole
// thing when you start working with it earlier in the function.

// TODO: get gifs to load! right now you're getting a URL from Giphy,
// which won't work. So either you need to find the actual media in the API or you need to
// use Giphy to embed properly, or you need to try something else.
