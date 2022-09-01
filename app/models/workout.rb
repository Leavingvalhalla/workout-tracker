class Workout < ApplicationRecord
    belongs_to :user
    has_many :user_lifts
    has_many :lifts, through: :user_lifts
end
