class UserLift < ApplicationRecord
    validates :reps, presence: true
    
    belongs_to :workout
    belongs_to :lift
end
