class User < ApplicationRecord
    has_secure_password
    belongs_to :routine, optional: true
    has_many :lifts, through: :user_lifts
end
