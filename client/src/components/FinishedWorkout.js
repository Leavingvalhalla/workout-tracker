import { useEffect, useState } from 'react';
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
                {context.user.deloads.length == 1 ? 'a lift' : 'some lifts'}{' '}
                today:
              </p>
              {context.user.deloads.map((lift) => (
                <p>your max weight for {lift} has gone down 10%.</p>
              ))}
            </div>
          )}
          {context.user.increases &&
            context.user.increases.map((lift) => {
              <p>Your training max for {lift} has gone up!</p>;
            })}
        </div>
      )}
    </MyConsumer>
  );
}
export default FinishedWorkout;

// TODO: Finish the rendering: right now the increases aren't rendering. Then change the lift numbers to lift names.
// Probably on the backend, despite it already being the longest function of all time already.
// weigh pros and cons of actually listing the exact weights. Probably not too bad if you just select the whole
// thing when you start working with it earlier in the function.

// TODO: get gifs to load! right now you're getting a URL from Giphy,
// which won't work. So either you need to find the actual media in the API or you need to
// use Giphy to embed properly, or you need to try something else.
