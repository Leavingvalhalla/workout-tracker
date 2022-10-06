require 'date'

Lift.create([
    {name: 'Back Squat'}, 
    {name: 'Front Squat'},
    {name: 'Deadlift'},
    {name: 'Rack Pull'},
    {name: 'Romanian Deadlift'},
    {name: 'Good Morning'},
    {name: 'Power Clean'},
    {name: 'Bench Press'},
    {name: 'Close Grip Bench Press'}, 
    {name: 'Incline Bench Press'}, 
    {name: 'Bent Over Row'},
    {name: 'Yates Row'}, 
    {name: 'Overhead Press'},
    {name: 'Biceps Curl'},
    {name: 'Skull Crusher'},
    {name: 'Chin Up'}, 
    {name: 'Pull Up'},
    {name: 'Dip'},
    {name: 'Barbell Glute Bridge'},
    {name: 'Goblet Squat'},
    {name: 'Push Up'},
    {name: 'Single Leg Thrust'},
    {name: 'Box Squat'},
    {name: 'Delt Raise'},
    {name: 'Dumbell Chest Fly'},
    {name: 'Bulgarian Split Squat'},
    {name: 'Single Leg Glute Bridge'},
    {name: 'Dumbell Step Up'},
    {name: 'Back Extension'},
    {name: 'Calf Raise'},
    {name: 'Hanging Leg Raise'},
    {name: 'Leg Curl'},
    {name: 'Lat Pulldown'},
    {name: 'Lat Raise'},
    {name: 'Reverse Fly'},
    ])


Routine.create([{name: 'r/Fitness Beginner Routine'}, {name: 'Strong Curves'}, {name:, "Wendler's 5/3/1"}, {name: 'German Volume Training'}])

RoutineLift.create([
    {routine_id: 1, lift_id: 11, weight: 1, reps: 5, position: 1, index: 1, amrap: false},
    {routine_id: 1, lift_id: 11, weight: 1, reps: 5, position: 1, index: 2, amrap: false},
    {routine_id: 1, lift_id: 11, weight: 1, reps: 5, position: 1, index: 3, amrap: true},
    {routine_id: 1, lift_id: 8, weight: 1, reps: 5, position: 1, index: 4, amrap: false},
    {routine_id: 1, lift_id: 8, weight: 1, reps: 5, position: 1, index: 5, amrap: false},
    {routine_id: 1, lift_id: 8, weight: 1, reps: 5, position: 1, index: 6, amrap: true},
    {routine_id: 1, lift_id: 1, weight: 1, reps: 5, position: 1, index: 7, amrap: false},
    {routine_id: 1, lift_id: 1, weight: 1, reps: 5, position: 1, index: 8, amrap: false},
    {routine_id: 1, lift_id: 1, weight: 1, reps: 5, position: 1, index: 9, amrap: true},
    {routine_id: 1, lift_id: 16, weight: 1, reps: 5, position: 2, index: 1, amrap: false},
    {routine_id: 1, lift_id: 16, weight: 1, reps: 5, position: 2, index: 2, amrap: false},
    {routine_id: 1, lift_id: 16, weight: 1, reps: 5, position: 2, index: 3, amrap: true},
    {routine_id: 1, lift_id: 3, weight: 1, reps: 5, position: 2, index: 4, amrap: false},
    {routine_id: 1, lift_id: 3, weight: 1, reps: 5, position: 2, index: 5, amrap: false},
    {routine_id: 1, lift_id: 3, weight: 1, reps: 5, position: 2, index: 6, amrap: true},
    {routine_id: 2, lift_id: 19, weight: 1, reps: 15, position: 1, index: 1, amrap: false},
    {routine_id: 2, lift_id: 19, weight: 1, reps: 15, position: 1, index: 2, amrap: false},
    {routine_id: 2, lift_id: 19, weight: 1, reps: 15, position: 1, index: 3, amrap: false},
    {routine_id: 2, lift_id: 11, weight: 1, reps: 10, position: 1, index: 4, amrap: false},
    {routine_id: 2, lift_id: 11, weight: 1, reps: 10, position: 1, index: 5, amrap: false},
    {routine_id: 2, lift_id: 11, weight: 1, reps: 10, position: 1, index: 6, amrap: false},
    {routine_id: 2, lift_id: 1, weight: 1, reps: 15, position: 1, index: 7, amrap: false},
    {routine_id: 2, lift_id: 1, weight: 1, reps: 15, position: 1, index: 8, amrap: false},
    {routine_id: 2, lift_id: 1, weight: 1, reps: 15, position: 1, index: 9, amrap: false},
    {routine_id: 2, lift_id: 5, weight: 1, reps: 15, position: 1, index: 10, amrap: false},
    {routine_id: 2, lift_id: 5, weight: 1, reps: 15, position: 1, index: 11, amrap: false},
    {routine_id: 2, lift_id: 5, weight: 1, reps: 15, position: 1, index: 12, amrap: false},
    {routine_id: 2, lift_id: 27, weight: 1, reps: 15, position: 2, index: 1, amrap: false},
    {routine_id: 2, lift_id: 27, weight: 1, reps: 15, position: 2, index: 2, amrap: false},
    {routine_id: 2, lift_id: 27, weight: 1, reps: 15, position: 2, index: 3, amrap: false},
    {routine_id: 2, lift_id: 17, weight: 1, reps: 10, position: 2, index: 4, amrap: false},
    {routine_id: 2, lift_id: 17, weight: 1, reps: 10, position: 2, index: 5, amrap: false},
    {routine_id: 2, lift_id: 17, weight: 1, reps: 10, position: 2, index: 6, amrap: false},
    {routine_id: 2, lift_id: 28, weight: 1, reps: 15, position: 2, index: 7, amrap: false},
    {routine_id: 2, lift_id: 28, weight: 1, reps: 15, position: 2, index: 8, amrap: false},
    {routine_id: 2, lift_id: 28, weight: 1, reps: 15, position: 2, index: 9, amrap: false},
    {routine_id: 2, lift_id: 13, weight: 1, reps: 10, position: 2, index: 10, amrap: false},
    {routine_id: 2, lift_id: 13, weight: 1, reps: 10, position: 2, index: 11, amrap: false},
    {routine_id: 2, lift_id: 13, weight: 1, reps: 10, position: 2, index: 12, amrap: false},
    {routine_id: 2, lift_id: 29, weight: 1, reps: 15, position: 2, index: 13, amrap: false},
    {routine_id: 2, lift_id: 29, weight: 1, reps: 15, position: 2, index: 14, amrap: false},
    {routine_id: 2, lift_id: 29, weight: 1, reps: 15, position: 2, index: 15, amrap: false},
    {routine_id: 3, lift_id: 13, weight: 0.65, reps: 5, position: 1, index: 1, amrap: false},
    {routine_id: 3, lift_id: 13, weight: 0.75, reps: 5, position: 1, index: 2, amrap: false},
    {routine_id: 3, lift_id: 13, weight: 0.85, reps: 5, position: 1, index: 3, amrap: true},
    {routine_id: 3, lift_id: 13, weight: 0.65, reps: 5, position: 1, index: 4, amrap: true},
    {routine_id: 3, lift_id: 9, weight: 0.5, reps: 10, position: 1, index: 5, amrap: false},
    {routine_id: 3, lift_id: 9, weight: 0.6, reps: 10, position: 1, index: 6, amrap: false},
    {routine_id: 3, lift_id: 9, weight: 0.7, reps: 10, position: 1, index: 7, amrap: false},
    {routine_id: 3, lift_id: 3, weight: 0.65, reps: 5, position: 2, index: 1, amrap: false},
    {routine_id: 3, lift_id: 3, weight: 0.75, reps: 5, position: 2, index: 2, amrap: false},
    {routine_id: 3, lift_id: 3, weight: 0.85, reps: 5, position: 2, index: 3, amrap: true},
    {routine_id: 3, lift_id: 3, weight: 0.65, reps: 5, position: 2, index: 4, amrap: true},
    {routine_id: 3, lift_id: 2, weight: 0.5, reps: 10, position: 2, index: 5, amrap: false},
    {routine_id: 3, lift_id: 2, weight: 0.6, reps: 10, position: 2, index: 6, amrap: false},
    {routine_id: 3, lift_id: 2, weight: 0.7, reps: 10, position: 2, index: 7, amrap: false},
    {routine_id: 3, lift_id: 8, weight: 0.65, reps: 5, position: 3, index: 1, amrap: false},
    {routine_id: 3, lift_id: 8, weight: 0.75, reps: 5, position: 3, index: 2, amrap: false},
    {routine_id: 3, lift_id: 8, weight: 0.85, reps: 5, position: 3, index: 3, amrap: true},
    {routine_id: 3, lift_id: 8, weight: 0.65, reps: 5, position: 3, index: 4, amrap: true},
    {routine_id: 3, lift_id: 10, weight: 0.5, reps: 10, position: 3, index: 5, amrap: false},
    {routine_id: 3, lift_id: 10, weight: 0.6, reps: 10, position: 3, index: 6, amrap: false},
    {routine_id: 3, lift_id: 10, weight: 0.7, reps: 10, position: 3, index: 7, amrap: false},
    {routine_id: 3, lift_id: 1, weight: 0.65, reps: 5, position: 4, index: 1, amrap: false},
    {routine_id: 3, lift_id: 1, weight: 0.75, reps: 5, position: 4, index: 2, amrap: false},
    {routine_id: 3, lift_id: 1, weight: 0.85, reps: 5, position: 4, index: 3, amrap: true},
    {routine_id: 3, lift_id: 1, weight: 0.65, reps: 5, position: 4, index: 4, amrap: true},
    {routine_id: 3, lift_id: 5, weight: 0.5, reps: 10, position: 4, index: 5, amrap: false},
    {routine_id: 3, lift_id: 5, weight: 0.6, reps: 10, position: 4, index: 6, amrap: false},
    {routine_id: 3, lift_id: 5, weight: 0.7, reps: 10, position: 4, index: 7, amrap: false},
    {routine_id: 3, lift_id: 13, weight: 0.7, reps: 5, position: 5, index: 1, amrap: false},
    {routine_id: 3, lift_id: 13, weight: 0.8, reps: 5, position: 5, index: 2, amrap: false},
    {routine_id: 3, lift_id: 13, weight: 0.9, reps: 5, position: 5, index: 3, amrap: true},
    {routine_id: 3, lift_id: 13, weight: 0.7, reps: 5, position: 5, index: 4, amrap: true},
    {routine_id: 3, lift_id: 9, weight: 0.6, reps: 8, position: 5, index: 5, amrap: false},
    {routine_id: 3, lift_id: 9, weight: 0.7, reps: 8, position: 5, index: 6, amrap: false},
    {routine_id: 3, lift_id: 9, weight: 0.8, reps: 6, position: 5, index: 7, amrap: false},
    {routine_id: 3, lift_id: 3, weight: 0.7, reps: 5, position: 6, index: 1, amrap: false},
    {routine_id: 3, lift_id: 3, weight: 0.8, reps: 5, position: 6, index: 2, amrap: false},
    {routine_id: 3, lift_id: 3, weight: 0.9, reps: 5, position: 6, index: 3, amrap: true},
    {routine_id: 3, lift_id: 3, weight: 0.7, reps: 5, position: 6, index: 4, amrap: true},
    {routine_id: 3, lift_id: 2, weight: 0.6, reps: 8, position: 6, index: 5, amrap: false},
    {routine_id: 3, lift_id: 2, weight: 0.7, reps: 8, position: 6, index: 6, amrap: false},
    {routine_id: 3, lift_id: 2, weight: 0.8, reps: 6, position: 6, index: 7, amrap: false},
    {routine_id: 3, lift_id: 8, weight: 0.7, reps: 5, position: 7, index: 1, amrap: false},
    {routine_id: 3, lift_id: 8, weight: 0.8, reps: 5, position: 7, index: 2, amrap: false},
    {routine_id: 3, lift_id: 8, weight: 0.9, reps: 5, position: 7, index: 3, amrap: true},
    {routine_id: 3, lift_id: 8, weight: 0.7, reps: 5, position: 7, index: 4, amrap: true},
    {routine_id: 3, lift_id: 10, weight: 0.6, reps: 8, position: 7, index: 5, amrap: false},
    {routine_id: 3, lift_id: 10, weight: 0.7, reps: 8, position: 7, index: 6, amrap: false},
    {routine_id: 3, lift_id: 10, weight: 0.8, reps: 6, position: 7, index: 7, amrap: false},
    {routine_id: 3, lift_id: 1, weight: 0.7, reps: 5, position: 8, index: 1, amrap: false},
    {routine_id: 3, lift_id: 1, weight: 0.8, reps: 5, position: 8, index: 2, amrap: false},
    {routine_id: 3, lift_id: 1, weight: 0.9, reps: 5, position: 8, index: 3, amrap: true},
    {routine_id: 3, lift_id: 1, weight: 0.7, reps: 5, position: 8, index: 4, amrap: true},
    {routine_id: 3, lift_id: 5, weight: 0.6, reps: 8, position: 8, index: 5, amrap: false},
    {routine_id: 3, lift_id: 5, weight: 0.7, reps: 8, position: 8, index: 6, amrap: false},
    {routine_id: 3, lift_id: 5, weight: 0.8, reps: 6, position: 8, index: 7, amrap: false},
    {routine_id: 3, lift_id: 13, weight: 0.75, reps: 5, position: 9, index: 1, amrap: false},
    {routine_id: 3, lift_id: 13, weight: 0.85, reps: 5, position: 9, index: 2, amrap: false},
    {routine_id: 3, lift_id: 13, weight: 0.95, reps: 5, position: 9, index: 3, amrap: true},
    {routine_id: 3, lift_id: 13, weight: 0.75, reps: 5, position: 9, index: 4, amrap: true},
    {routine_id: 3, lift_id: 9, weight: 0.65, reps: 5, position: 9, index: 5, amrap: false},
    {routine_id: 3, lift_id: 9, weight: 0.75, reps: 5, position: 9, index: 6, amrap: false},
    {routine_id: 3, lift_id: 9, weight: 0.85, reps: 5, position: 9, index: 7, amrap: false},
    {routine_id: 3, lift_id: 3, weight: 0.75, reps: 5, position: 10, index: 1, amrap: false},
    {routine_id: 3, lift_id: 3, weight: 0.85, reps: 5, position: 10, index: 2, amrap: false},
    {routine_id: 3, lift_id: 3, weight: 0.95, reps: 5, position: 10, index: 3, amrap: true},
    {routine_id: 3, lift_id: 3, weight: 0.75, reps: 5, position: 10, index: 4, amrap: true},
    {routine_id: 3, lift_id: 2, weight: 0.65, reps: 5, position: 10, index: 5, amrap: false},
    {routine_id: 3, lift_id: 2, weight: 0.75, reps: 5, position: 10, index: 6, amrap: false},
    {routine_id: 3, lift_id: 2, weight: 0.85, reps: 5, position: 10, index: 7, amrap: false},
    {routine_id: 3, lift_id: 8, weight: 0.75, reps: 5, position: 11, index: 1, amrap: false},
    {routine_id: 3, lift_id: 8, weight: 0.85, reps: 5, position: 11, index: 2, amrap: false},
    {routine_id: 3, lift_id: 8, weight: 0.95, reps: 5, position: 11, index: 3, amrap: true},
    {routine_id: 3, lift_id: 8, weight: 0.75, reps: 5, position: 11, index: 4, amrap: true},
    {routine_id: 3, lift_id: 10, weight: 0.65, reps: 5, position: 11, index: 5, amrap: false},
    {routine_id: 3, lift_id: 10, weight: 0.75, reps: 5, position: 11, index: 6, amrap: false},
    {routine_id: 3, lift_id: 10, weight: 0.85, reps: 5, position: 11, index: 7, amrap: false},
    {routine_id: 3, lift_id: 1, weight: 0.75, reps: 5, position: 12, index: 1, amrap: false},
    {routine_id: 3, lift_id: 1, weight: 0.85, reps: 5, position: 12, index: 2, amrap: false},
    {routine_id: 3, lift_id: 1, weight: 0.95, reps: 5, position: 12, index: 3, amrap: true},
    {routine_id: 3, lift_id: 1, weight: 0.75, reps: 5, position: 12, index: 4, amrap: true},
    {routine_id: 3, lift_id: 5, weight: 0.65, reps: 5, position: 12, index: 5, amrap: false},
    {routine_id: 3, lift_id: 5, weight: 0.75, reps: 5, position: 12, index: 6, amrap: false},
    {routine_id: 3, lift_id: 5, weight: 0.85, reps: 5, position: 12, index: 7, amrap: false},
])

10.times {RoutineLift.create([{routine_id: 4, lift_id: 8, weight: 0.6, reps: 10, position: 1, amrap: false},
    {routine_id: 4, lift_id: 11, weight: 0.6, reps: 10, position: 1, amrap: false}
    ])}
3.times {RoutineLift.create([{routine_id: 4, lift_id: 25, weight: 0.6, reps: 10, position: 1, amrap: false},
    {routine_id: 4, lift_id: 33, weight: 0.6, reps: 10, position: 1, amrap: false}
    ])}
10.times {RoutineLift.create([{routine_id: 4, lift_id: 1, weight: 0.6, reps: 10, position: 2, amrap: false},
    {routine_id: 4, lift_id: 32, weight: 0.6, reps: 10, position: 2, amrap: false}
    ])}
3.times {RoutineLift.create([{routine_id: 4, lift_id: 30, weight: 0.6, reps: 10, position: 2, amrap: false},
    {routine_id: 4, lift_id: 31, weight: 0.6, reps: 10, position: 2, amrap: false}
    ])}
10.times {RoutineLift.create([{routine_id: 4, lift_id: 9, weight: 0.9, reps: 6, position: 3, amrap: false},
    {routine_id: 4, lift_id: 14, weight: 0.9, reps: 6, position: 3, amrap: false}
    ])}
3.times {RoutineLift.create([{routine_id: 4, lift_id: 34, weight: 0.6, reps: 6, position: 3, amrap: false},
    {routine_id: 4, lift_id: 35, weight: 0.6, reps: 6, position: 3, amrap: false}
    ])}


User.create([{username: 'asdf', password_digest: BCrypt::Password.create('1234')}, {username: 'fdsa', password_digest: BCrypt::Password.create('4321')}])

legs = rand(1..7)
arms = rand(8..18)
legs_weight = rand(135..275)
arms_weight = rand(95..135)
reps = rand(1..10)

(1..30).each do |i|
    date = Date.new(2022,8,i)
    Workout.create({user_id: 1, date: date})
    (1..2).each do |j|
        x = rand(8..18)
        (1..3).each do 
            UserLift.create({lift_id: x, workout_id: i, weight: rand(95..135), reps: rand(1..10)})
        end
    end
    (1..2).each do |j|
        x = rand(1..7)
        (1..3).each do 
            UserLift.create({lift_id: x, workout_id: i, weight: rand(135..275), reps: rand(1..10)})
        end
    end
end

(1..19).each do |i|
    Max.create({user_id: 1, lift_id: i, lift_max: rand(135..225)})
end