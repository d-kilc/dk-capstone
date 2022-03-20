class TripSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :user_trips
  has_many :segments
end
