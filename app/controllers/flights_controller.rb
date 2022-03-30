class FlightsController < ApplicationController

    def search
        api = AmadeusApi.new
        
        from = params[:from]
        from = from.gsub('-',' ')
        to = params[:to]
        to = to.gsub('-',' ')
        
        # byebug
        
        from_result = api.amadeus.reference_data.locations.get({ keyword: from, subType: 'CITY'})
        to_result = api.amadeus.reference_data.locations.get({ keyword: to, subType: 'CITY'})
        
        # byebug

        from_id = from_result.data.first['id'][1..3]
        to_id = to_result.data.first['id'][1..3]

        flight_result = api.amadeus.shopping.flight_offers_search.get(originLocationCode: from_id, destinationLocationCode: to_id, departureDate: params[:when], adults: 1)

        flight_result = flight_result.result['data'][0..5]
        render json: flight_result, status: 200
    end

end
