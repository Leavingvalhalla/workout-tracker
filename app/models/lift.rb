class Lift < ApplicationRecord
    has_many :routines, through: :routine_lifts
    has_many :user_lifts
    has_many :workouts, through: :user_lifts
    has_many :users, through: :workouts
end
