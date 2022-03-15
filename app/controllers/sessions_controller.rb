class SessionsController < ApplicationController

    def create
        user = User.find_by email: params[:email]
        
        if user&.authenticate params[:password]
            session[:user_id] ||= user.id
            render json: user, status: 200
        else
            render json: { error: "Invalid credentials.", email: 'Unauthorized' }, status: 401
        end
    end

    def destroy
        session.delete :user_id
        render json: {email: 'Unauthorized'}, status: 200
    end

end