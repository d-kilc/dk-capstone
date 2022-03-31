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

        if params[:user_ids].size > 0
            params[:user_ids].each do |user_id|
                user_trip = UserTrip.new user_id: user_id, trip_id: trip.id

                if user_id == params[:user_id]
                    user_trip.role = 'collaborator'
                else
                    user_trip.role = 'creator'
                end
                
                user_trip.save!
            end
        else
            user_trip = UserTrip.create! user_id: params[:user_id], trip_id: trip.id, role: 'creator'
        end
        render json: trip, status: 201

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
