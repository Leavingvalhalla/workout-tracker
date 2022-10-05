class UserLift < ApplicationRecord
    belongs_to :workout
    belongs_to :lift

    validate :nil_reps

    def nil_reps
        if reps == nil
            reps = 0
        end
    end
end
