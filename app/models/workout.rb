class Workout < ApplicationRecord
    belongs_to :user
    has_many :lifts, through: :workout_lifts
end
