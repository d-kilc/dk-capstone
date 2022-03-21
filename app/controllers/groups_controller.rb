class GroupsController < ApplicationController

    def show
        group_id = params[:id]
        group = Group.find group_id
        render json: group, status: 200, serializer: GroupDetailSerializer
    end

    private

    def group_params
        params.permit :name
    end

end
