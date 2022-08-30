class Workout < ApplicationRecord
    belongs_to :user
    has_many :user_lifts
end
