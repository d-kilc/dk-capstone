class UserTripsController < ApplicationController
    def create
        user_trip = UserTrip.create! user_trip_params
        # byebug
        render json: user_trip, status: 201, serializer: UserTripSerializer
    end

    def destroy
        user_trip = UserTrip.find params[:id]
        user_trip.destroy!
        render json: {}, status: 200
    end

    private

    def user_trip_params
        params.permit :role, :trip_id, :user_id
    end
end
