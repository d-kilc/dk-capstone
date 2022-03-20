class UserTripSerializer < ActiveModel::Serializer
  attributes :id, :role, :trip, :user
end
