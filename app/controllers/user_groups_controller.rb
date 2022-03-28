class UserGroupsController < ApplicationController

    def create
        user_group = UserGroup.create! user_group_params
        render json: user_group, status: 201
    end

    def destroy
        user_group = UserGroup.find params[:id]
        user_group.destroy!
        render json: {}, status: 200
    end

    private

    def user_group_params
        params.permit :role, :group_id, :user_id
    end

end
