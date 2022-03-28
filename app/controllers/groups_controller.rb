class GroupsController < ApplicationController

    def show
        group_id = params[:id]
        group = Group.find group_id
        render json: group, status: 200, serializer: GroupDetailSerializer
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
