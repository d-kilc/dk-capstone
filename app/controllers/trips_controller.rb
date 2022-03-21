class TripsController < ApplicationController
    
    def show
        trip_id = params[:id]
        trip = Trip.find trip_id
        render json: trip, status: 200, serializer: TripDetailSerializer
    end

    private

    def trip_params
        params.permit :name
    end

end
