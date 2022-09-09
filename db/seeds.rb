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
