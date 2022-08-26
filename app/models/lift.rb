class Lift < ApplicationRecord
    belongs_to :routine, optional: true
    belongs_to :user, optional: true
end
