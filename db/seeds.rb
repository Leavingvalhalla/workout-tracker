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
    {name: 'Seated Row'}
    ])


Routine.create([{name: 'r/Fitness Beginner Routine'}, {name: 'Strong Curves'}, {name: '531'}, {name: 'nSuns'}])

RoutineLift.create([
    {routine_id: 1, lift_id: 11, weight: 1, reps: 5, position: 1, amrap: false},
    {routine_id: 1, lift_id: 11, weight: 1, reps: 5, position: 1, amrap: false},
    {routine_id: 1, lift_id: 11, weight: 1, reps: 5, position: 1, amrap: true},
    {routine_id: 1, lift_id: 8, weight: 1, reps: 5, position: 1, amrap: false},
    {routine_id: 1, lift_id: 8, weight: 1, reps: 5, position: 1, amrap: false},
    {routine_id: 1, lift_id: 8, weight: 1, reps: 5, position: 1, amrap: true},
    {routine_id: 1, lift_id: 1, weight: 1, reps: 5, position: 1, amrap: false},
    {routine_id: 1, lift_id: 1, weight: 1, reps: 5, position: 1, amrap: false},
    {routine_id: 1, lift_id: 1, weight: 1, reps: 5, position: 1, amrap: true},
    {routine_id: 1, lift_id: 16, weight: 1, reps: 5, position: 2, amrap: false},
    {routine_id: 1, lift_id: 16, weight: 1, reps: 5, position: 2, amrap: false},
    {routine_id: 1, lift_id: 16, weight: 1, reps: 5, position: 2, amrap: true},
    {routine_id: 1, lift_id: 3, weight: 1, reps: 5, position: 2, amrap: false},
    {routine_id: 1, lift_id: 3, weight: 1, reps: 5, position: 2, amrap: false},
    {routine_id: 1, lift_id: 3, weight: 1, reps: 5, position: 2, amrap: true},
])
3.times do
    RoutineLift.create([
    {routine_id: 2, lift_id: 19, weight: 1, reps: 15, position: 1, amrap: false},
    {routine_id: 2, lift_id: 11, weight: 1, reps: 10, position: 1, amrap: false},
    {routine_id: 2, lift_id: 1, weight: 1, reps: 15, position: 1, amrap: false},
    {routine_id: 2, lift_id: 5, weight: 1, reps: 15, position: 1, amrap: false},
    {routine_id: 2, lift_id: 27, weight: 1, reps: 15, position: 2, amrap: false},
    {routine_id: 2, lift_id: 17, weight: 1, reps: 10, position: 2, amrap: false},
    {routine_id: 2, lift_id: 28, weight: 1, reps: 15, position: 2, amrap: false},
    {routine_id: 2, lift_id: 13, weight: 1, reps: 10, position: 2, amrap: false},
    {routine_id: 2, lift_id: 29, weight: 1, reps: 15, position: 2, amrap: false},
    {routine_id: 2, lift_id: 19, weight: 1, reps: 15, position: 3, amrap: false},
    {routine_id: 2, lift_id: 30, weight: 1, reps: 10, position: 3, amrap: false},
    {routine_id: 2, lift_id: 1, weight: 1, reps: 15, position: 3, amrap: false},
    {routine_id: 2, lift_id: 10, weight: 1, reps: 10, position: 3, amrap: false}   
])

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

(1..16).each do |i|
    Max.create({user_id: 1, lift_id: i, max: rand(135..225)})
end
# (31..60).each do |i|
#     date = Date.new(2022,8,i)
#     Workout.create({user_id: 2, date: date})
#     (1..2).each do |j|
#         x = rand(8..18)
#         (1..3).each do 
#             UserLift.create({lift_id: x, workout_id: i, weight: rand(95..135), reps: rand(1..10)})
#         end
#     end
#     (1..2).each do |j|
#         x = rand(1..7)
#         (1..3).each do 
#             UserLift.create({lift_id: x, workout_id: i, weight: rand(135..275), reps: rand(1..10)})
#         end
#     end
# end
