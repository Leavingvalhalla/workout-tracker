class UserLift < ApplicationRecord
    belongs_to :workout
    belongs_to :lift
    validates :lift_id, presence: true
    validates :reps, presence: true
    validates :reps, comparison: {greater_than: 0}
    validates :weight, presence: true
    validates :weight, comparison: {greater_than: 0}    
end
