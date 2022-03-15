class ApplicationController < ActionController::API
    include ActionController::Cookies
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def record_not_found
        render json: {email: "Unauthorized"}, status: 404
    end

    def record_invalid invalid
        render json: {errors: invalid.record.errors.to_a}, status: 422
    end

end
