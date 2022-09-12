class User < ApplicationRecord
    has_secure_password
    belongs_to :routine, optional: true
    has_many :user_lifts
    has_many :lifts, through: :user_lifts
    has_many :maxes
    has_many :lifts, through: :maxes
end

def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end