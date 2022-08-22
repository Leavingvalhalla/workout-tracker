class User < ApplicationRecord
    has_secure_password
    belongs_to :routine
    has_many :workouts
end
