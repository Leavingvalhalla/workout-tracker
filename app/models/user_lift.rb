class UserLift < ApplicationRecord
    belongs_to :user
    belongs_to :lift
end
