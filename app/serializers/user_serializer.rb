class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name
  has_many :user_trips
  has_many :user_groups
end
