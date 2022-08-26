class Lift < ApplicationRecord
    has_many :routines, through: :routine_lifts
    has_many :users, through: :user_lifts
end
