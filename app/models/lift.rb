class Lift < ApplicationRecord
    belongs_to :routine
    belongs_to :workout
    belongs_to :user
end
