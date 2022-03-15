class UsersController < ApplicationController

    def show
        user = User.find session[:user_id]
        render json: user, status: 200
    end

    def create
        user = User.create! email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation]
        session[:user_id] ||= user.id
        render json: user, status: 200
    end

end
