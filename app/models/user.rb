class User < ApplicationRecord
    has_secure_password
    belongs_to :routine, optional: true
    has_many :user_lifts
    has_many :lifts, through: :user_lifts
end
