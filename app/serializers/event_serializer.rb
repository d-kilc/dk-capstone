class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :start, :end
  belongs_to :trip
  belongs_to :user
end
