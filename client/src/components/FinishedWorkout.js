import { Typography } from '@mui/material';
import { MyConsumer } from './MyContext';
import { Card, CardContent } from '@mui/material';

function FinishedWorkout() {
  return (
    <MyConsumer>
      {(context) => (
        <div>
          <Typography variant="h1">You did it!</Typography>
          {context.user.deloads && (
            <Card>
              <CardContent>
                <Typography variant="h3">
                  You didn't quite hit your weight on{' '}
                  {context.user.deloads.length === 1 ? 'a lift' : 'some lifts'}{' '}
                  today:
                </Typography>
                {context.user.deloads.map((liftId) => (
                  <Typography variant="h4" key={liftId}>
                    your max weight for{' '}
                    {context.lifts
                      .filter((lift) => lift.id === liftId)[0]
                      .name.toLowerCase()}{' '}
                    has gone down 10%.
                  </Typography>
                ))}
              </CardContent>
            </Card>
          )}
          {context.user.increases && (
            <Card>
              <CardContent>
                <Typography variant="h3">You're moving up!</Typography>
                {context.user.increases.map((liftId) => (
                  <Typography variant="h4" key={liftId}>
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
