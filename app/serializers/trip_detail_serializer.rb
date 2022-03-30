class TripDetailSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :segments
  has_many :user_trips, serializer: UserTripUsersSerializer
end
  