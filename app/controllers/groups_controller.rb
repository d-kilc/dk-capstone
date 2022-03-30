class GroupsController < ApplicationController

    def show
        group_id = params[:id]
        group = Group.find group_id
        render json: group, status: 200, serializer: GroupDetailSerializer
    end

    def create
        group = Group.create! group_params
        user_group = UserGroup.create! role: 'creator', user_id: params[:user_id], group_id: group.id
        render json: user_group, status: 200, serializer: UserGroupSerializer
    end

    def update
        group_id = params[:id]
        group = Group.find group_id
        group.update! group_params
        render json: group, status: 200
    end

    private

    def group_params
        params.permit :name
    end

end
