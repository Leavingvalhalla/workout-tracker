# Get swole with Swole

## Description

Swole is a workout tracking app, specifically for weightlifting. It includes some built-in workout routines that are easy to follow, and some charts to make it easy to visualize your progress.

## How to install

If you want to run your own copy of it on a home server, you will need npm and bundle installed on your machine.
Clone the repo, cd into the folder, then run `npm i --prefix client` and `bundle i`.

## Get it running

To create the database, in your terminal type `rails db:create db:migrate db:seed`. There is a dummy user in the seed files that you can feel free to remove before seeding, but all of the lifts and routines are saved through seeding the database, so I would highly recommend seeding the database if you plan on using it.

To start the server, type `rails s`. Then, in a separate terminal, type `npm start --prefix client`. This should open a browser window to http://localhost:3000 , where you can use the app.

## Usage

First, you'll want to make an account. After that, you can simply click "Custom Workout" to start using it as-is immediately. If you want to use the routines, you simply go to the "Pick Routines" section, and once you've picked one, fill out your starting weights on all the applicable lifts.
From there, you just click "Continue Routine" on the homepage, rather than the "Custom Workout" button, and the lifts will autofill to what you need to do for that particular day of the workout.
Lastly, if you want to track your progress, click on "See The Stats" and you can chart your progress of any lift from a number of different metrics, on a few different timelines.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
