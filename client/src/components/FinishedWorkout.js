import { useEffect, useState } from 'react';

function FinishedWorkout() {
  const [gif, setGif] = useState('');

  useEffect(() => {
    fetch('/gif', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setGif(data.data.embed_url));
  }, []);
  console.log(gif);
  return (
    <div>
      <p>You did it!</p>
      <img src={gif} />
    </div>
  );
}
export default FinishedWorkout;

// TODO: get gifs to load! right now you're getting a URL from Giphy,
// which won't work. So either you need to find the actual media in the API or you need to
// use Giphy to embed properly, or you need to try something else.
