class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, status: 200, each_serializer: UserSummarySerializer
    end

    def show
        user = User.find session[:user_id]
        # render json: { **user.attributes, loggedIn: true }, status: 200, serializer: UserSerializer
        render json: user, status: 200
    end

    def create
        user = User.create! email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation], name: params[:name]
        session[:user_id] ||= user.id
        render json: user, status: 200
    end

    def update
        user = User.find session[:user_id]
        user.update! user_params
        render json: user, status: 200
    end

    private

    def user_params
        params.permit :name, :email
    end

end
