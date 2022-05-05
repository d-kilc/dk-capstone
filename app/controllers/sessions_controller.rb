class SessionsController < ApplicationController

    def create
        user = User.find_by email: params[:email]
        
        if user&.authenticate params[:password]
            session[:user_id] ||= user.id
            render json: user, status: 200
        else
            render json: { errors: "Invalid credentials.", email: 'Unauthorized', loggedIn: false }, status: 401
        end
    end

    def destroy
        session.delete :user_id
        # render json: {email: 'Unauthorized'}, status: 200
        render json: nil, status: 200
    end

end