class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :user_groups
end
