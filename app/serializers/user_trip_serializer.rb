class UserTripSerializer < ActiveModel::Serializer
  # attributes :id, :role, :trip, :user
  attributes :id, :role, :trip, :user
  belongs_to :user
  belongs_to :trip, serializer: TripDetailSerializer
end
