class AccommodationsController < ApplicationController

    def search
        api = AmadeusApi.new
        
        location = api.amadeus.reference_data.locations.get({ keyword: params[:keyword], subType: 'CITY'})
        location_id = location.result['data'].first['id'][1..3]
        
        hotel = api.amadeus.shopping.hotel_offers.get({
            cityCode: location_id,
            checkInDate: params[:when],
            checkOutDate: params[:until]
        })
        
        hotel_result = hotel.result['data'][0..24]
        render json: hotel_result, status: 200
    end

end