class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :created_at
  has_many :user_trips
  has_many :user_groups
end
