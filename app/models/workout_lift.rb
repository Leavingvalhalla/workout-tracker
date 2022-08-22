class WorkoutLift < ApplicationRecord
    belongs_to :workouts
    belongs_to :lifts
end
