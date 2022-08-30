class UserLift < ApplicationRecord
    belongs_to :workout
    belongs_to :lift
end
