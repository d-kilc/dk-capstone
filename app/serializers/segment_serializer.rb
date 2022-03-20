class SegmentSerializer < ActiveModel::Serializer
  attributes :id, :from, :to, :when, :trip_sequence
  has_one :trip
end
