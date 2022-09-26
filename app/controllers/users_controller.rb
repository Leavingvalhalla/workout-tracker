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

    # gets random bodybuilding gif from API
    def get_gif
        url = URI("https://api.giphy.com/v1/gifs/random?api_key=#{$api_key}&tag=swole")
        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE
        
        request = Net::HTTP::Get.new(url)
        
        response = http.request(request)
        render json: response.read_body
    end

    def update
        user = User.find(params[:id])
        user.update(routine_id: params[:routine_id], routine_position: params[:routine_position])
        render json: user, status: :ok
    end

    # Moves to the next position in the routine, starts back at 1 if routine is over
    def next_routine_pos
        user = User.find(params[:id])
        routine = RoutineLift.select('reps', 'weight').where('routine_id = ? and position = ?', user.routine_id, (user.routine_position + 1))
        workout = UserLift.select('reps').where(workout_id: Workout.last)

        # (0...routine.length) do |i|
        #     if routine[i].reps > workout[i].reps
            

        # end

        # byebug



        # pull each lift from the current routine day
        # pull each actual result from user workout
        # if any lift goes below the minimum for that lift, drop the user.max down 10% (rounded.)
        # Figure out when each routine goes up in weight, and add that as long as they don't fuck something up before that.
        # Does a fuckup take another column in the User table? Hopefully not. maybe just let it go down immediately
        # but still go up when it's supposed to go up. Having a hard time remembering what I do in real life.
        # Either it goes down immediately or at the end of the cycle. If it's the end of the cycle it may take
        # that extra User column. Or something even more complicated.

        # Maybe at the end of a fuckup or a go up on weights, have messages that explain the change, on the 
        # Continue Routine page.





        if routine[0].position
            user.update(routine_position: (user.routine_position + 1))
            render json: user, status: :ok
        end
        rescue NoMethodError
            user.update(routine_position: 1)
        render json: user, status: :ok
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :password_confirmation)
    end
end