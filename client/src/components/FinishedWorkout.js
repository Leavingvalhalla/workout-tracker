import { MyConsumer } from './MyContext';

function FinishedWorkout() {
  return (
    <MyConsumer>
      {(context) => (
        <div>
          <p>You did it!</p>
          {context.user.deloads && (
            <div>
              <p>
                You didn't quite hit your weight on{' '}
                {context.user.deloads.length === 1 ? 'a lift' : 'some lifts'}{' '}
                today:
              </p>
              {context.user.deloads.map((liftId) => (
                <p key={liftId}>
                  your max weight for{' '}
                  {context.lifts
                    .filter((lift) => lift.id === liftId)[0]
                    .name.toLowerCase()}{' '}
                  has gone down 10%.
                </p>
              ))}
            </div>
          )}
          {context.user.increases && (
            <div>
              <p>You're moving up!</p>
              {context.user.increases.map((liftId) => (
                <p key={liftId}>
                  Your max for{' '}
                  {context.lifts
                    .filter((lift) => lift.id === liftId)[0]
                    .name.toLowerCase()}{' '}
                  is going up!
                </p>
              ))}
            </div>
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
