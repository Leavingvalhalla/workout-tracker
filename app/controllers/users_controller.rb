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

    
    def finish_routine_workout
        user = User.find(params[:id])
        routine_lifts = RoutineLift.select('reps', 'weight', 'lift_id').where('routine_id = ? and position = ?', user.routine_id, (user.routine_position + 1))
        workout = UserLift.select('reps').where(workout_id: Workout.last)
        deloads = []
        increases = []

        # checks if any goals were missed, needing to lower the max weight for future workouts,
        # updates the max and adds it to a list to be rendered
        (0...routine_lifts.length).times do |i|
            if routine_lifts[i].reps > workout[i].reps
                max = Max.where('lift_id = ? and user_id = ?', routine_lifts[i].lift_id, user.id)
                deloaded_max = ((max.max * 0.9) / 5).ceil * 5
                max.update(max: deloaded_max)
                deloads << routine[i].lift_id
            end
        end

        

        # checks if time to move up weight on a lift, adds it to a list

        # beginner program adds weight faster than other programs
        if user.routine_id == 1
            (0...routine_lifts.length).times do |i|
                if !deloads.include?(routine_lifts[i].lift_id) && !increases.include?(routine_lifts[i].lift_id)
                    increases << routine_lifts[i].lift_id
                end
            end
        else
            final_lift = RoutineLift.where(routine_id: user.routine_id).order('position DESC').limit(1)
            if user.routine_position == final_lift.position
            (0...routine_lifts.length).times do |i|
                if !deloads.include?(routine_lifts[i].lift_id) && !increases.include?(routine_lifts[i].lift_id)
                    increases << routine_lifts[i].lift_id
                    end
                end
            end
        end

        if increases != []
            increases.each do |id|
                max = Max.where('lift_id = ? and user_id = ?', id, user.id)
                if user.routine == 1 or user.routine == 2
                    upped_max = max.max + 5    
                elsif user.routine == 3
                    # if it's a lower-body lift the weight goes up by more
                    if id < 10
                        upped_max = max.max + 10
                    else
                        upped_max = max.max + 5
                    end
                else
                    # ups weight by 2%, rounding to 5lbs
                    upped_max = (max.max + (max.max * 0.02) / 5).ceil * 5
                end
                max.update(max: upped_max)
            end
        end

        if routine[0].position
            user.update(routine_position: (user.routine_position + 1))
            render json: {username: user.username, routine_id: user.routine.id, routine_position: user.routine_position, 
                deloads: deloads, increases: increases}, status: :ok
        end
        rescue NoMethodError
            user.update(routine_position: 1)
            render json: {username: user.username, routine_id: user.routine.id, routine_position: user.routine_position, 
                deloads: deloads, increases: increases}, status: :ok
        end 
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end