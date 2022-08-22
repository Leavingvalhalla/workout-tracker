class Routine < ApplicationRecord
    has_many :users
    has_many :lifts, through: :routine_lifts
end
