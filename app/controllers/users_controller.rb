require_relative '../../.api_key.rb'
require 'uri'
require 'net/http'
require 'openssl'


class UsersController < ApplicationController

    def create
        user = User.create(user_params)
        if user.valid?
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end    
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
          render json: user
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def get_quote

        url = URI("https://bodybuilding-quotes1.p.rapidapi.com/random-quote")
        
        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE
        
        request = Net::HTTP::Get.new(url)
        request["X-RapidAPI-Key"] = $api_key
        request["X-RapidAPI-Host"] = 'bodybuilding-quotes1.p.rapidapi.com'
        
        response = http.request(request)
        render json: response.read_body
    end

    def update
        user = User.find(params[:id])
        byebug
        user.update(routine_id: params[:routine_id], routine_position: params[:routine_position])
        render json: user, status: :ok
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
