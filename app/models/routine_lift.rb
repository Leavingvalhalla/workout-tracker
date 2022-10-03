class RoutineLift < ApplicationRecord
    belongs_to :routine
    belongs_to :lift

    validate :nil_reps

    def nil_reps
        if reps == nil
            reps = 0
        end
    end
end
