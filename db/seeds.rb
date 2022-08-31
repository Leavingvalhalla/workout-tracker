# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Lift.create([
    {name: 'Back Squat'}, 
    {name: 'Front Squat'},
    {name: 'Bench Press'},
    {name: 'Close Grip Bench Press'}, 
    {name: 'Incline Bench Press'}, 
    {name: 'Rack Pull'},
    {name: 'Romanian Deadlift'},
    {name: 'Bent Over Row'},
    {name: 'Yates Row'}, 
    {name: 'Overhead Press'},
    {name: 'Hip Thrust'},
    {name: 'Biceps Curl'},
    {name: 'Good Morning'},
    {name: 'Skull Crusher'},
    {name: 'Chin Up'}, 
    {name: 'Pull Up'},
    {name: 'Power Clean'},
    {name: 'Deadlift'},
    {name: 'Dip'},
    ])

User.create(username: 'asdf', password_digest: BCrypt::Password.create('1234'))

Workout.create([{user_id: 1, date: '2022/8/23'}, {user_id: 1, date:'2022/8/24'},
    {user_id: 1, date: '2022/8/27'}, {user_id: 1, date: '2022/8/27'}])

UserLift.create([{lift_id: 10, workout_id: 1, weight: 70, reps: 5}, 
    {lift_id: 10, workout_id: 1, weight: 80, reps: 5},
    {lift_id: 10, workout_id: 1, weight: 90, reps: 6},
    {lift_id: 10, workout_id: 1, weight: 70, reps: 10},
    {lift_id: 4, workout_id: 1, weight: 65, reps: 10},
    {lift_id: 4, workout_id: 1, weight: 75, reps: 10},
    {lift_id: 4, workout_id: 1, weight: 85, reps: 10},
    {lift_id: 18, workout_id: 2, weight: 190, reps: 5},
    {lift_id: 18, workout_id: 2, weight: 210, reps: 5},
    {lift_id: 18, workout_id: 2, weight: 250, reps: 6},
    {lift_id: 18, workout_id: 2, weight: 190, reps: 10},
    {lift_id: 2, workout_id: 2, weight: 65, reps: 10},
    {lift_id: 2, workout_id: 2, weight: 75, reps: 10},
    {lift_id: 2, workout_id: 2, weight: 85, reps: 10},
    {lift_id: 3, workout_id: 3, weight: 85, reps: 5},
    {lift_id: 3, workout_id: 3, weight: 100, reps: 5},
    {lift_id: 3, workout_id: 3, weight: 115, reps: 10},
    {lift_id: 3, workout_id: 3, weight: 85, reps: 10},
    {lift_id: 5, workout_id: 3, weight: 55, reps: 10},
    {lift_id: 5, workout_id: 3, weight: 70, reps: 10},
    {lift_id: 5, workout_id: 3, weight: 80, reps: 10},
    {lift_id: 12, workout_id: 3, weight: 20, reps: 10},
    {lift_id: 12, workout_id: 3, weight: 20, reps: 10},
    {lift_id: 12, workout_id: 3, weight: 20, reps: 10},
    {lift_id: 1, workout_id: 4, weight: 120, reps: 5},
    {lift_id: 1, workout_id: 4, weight: 135, reps: 5},
    {lift_id: 1, workout_id: 4, weight: 155, reps: 5},
    {lift_id: 7, workout_id: 4, weight: 100, reps: 10},
    {lift_id: 7, workout_id: 4, weight: 120, reps: 10},
    {lift_id: 7, workout_id: 4, weight: 140, reps: 10},
    ])