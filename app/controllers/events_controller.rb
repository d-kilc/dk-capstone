class EventsController < ApplicationController

    def index
        events = Event.all
        render json: events, status: 200
    end

    def create
        event = Event.new event_params
        # event.trip_id = params[:trip_id]
        # event.user_id = params[:user_id]
        # puts event
        event.save!
        render json: event, status: 201
    end

    def destroy
        event = Event.find params[:id]
        event.destroy!
        render json: {}, status: 200
    end

    private

    def event_params
        params.permit :trip_id, :user_id, :name, :description, :start, :end
    end

end
