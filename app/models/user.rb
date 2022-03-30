class User < ApplicationRecord
    has_secure_password
    
    has_many :user_groups
    has_many :groups, through: :user_groups

    has_many :user_trips
    has_many :trips, through: :user_trips

    validates :email, format: {with: /@/, message: "malformed"}
end
