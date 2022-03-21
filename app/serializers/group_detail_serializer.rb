class GroupDetailSerializer < ActiveModel::Serializer
    attributes :id, :name
    has_many :user_groups, serializer: UserGroupUsersSerializer
  end
  