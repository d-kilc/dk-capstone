class Trip < ApplicationRecord
  has_many :user_trips, dependent: :destroy
  has_many :users, through: :user_trips
  has_many :segments, dependent: :destroy

  validates :name, presence: true
  validates :name, length: { minimum: 5 }
end
