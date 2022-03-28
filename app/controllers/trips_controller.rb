class TripsController < ApplicationController
    
    # body: {
    #     name: newTrip.name,
    #     segments: newTrip.segments,
    # }

    def create
        trip = Trip.create! name: params[:name]

        params[:segments].each do |segment|
            Segment.create!(
                from: segment[:from][:label],
                to: segment[:to][:label],
                when: segment[:when],
                trip_id: trip.id,
                trip_sequence: segment[:tripSequence]
            )
        end

        user_trip = UserTrip.create! user_id: params[:user_id], trip_id: trip.id, role: 'creator'

        render json: trip, status: 201, serializer: TripDetailSerializer

    end
    
    def show
        trip_id = params[:id]
        trip = Trip.find trip_id
        render json: trip, status: 200, serializer: TripDetailSerializer
    end

    def update
        trip = Trip.find params[:id]
        trip.update! trip_params
        render json: trip, status: 200
    end

    def destroy
        trip = Trip.find params[:id]
        trip.destroy!
        render json: {}, status: 200
    end

    private

    def trip_params
        params.permit :name
    end

end
