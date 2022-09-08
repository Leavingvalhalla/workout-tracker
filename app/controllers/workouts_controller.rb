class WorkoutsController < ApplicationController

    def create
        render json: Workout.create(user_id: params[:user_id], date: params[:date]), status: :created
    end

    def show
        render json: Workout.where(user_id: params[:id])
    end

    def show_by_date
        workout = Workout.find_by(date: params[:date])
        render json: workout
    end

end


# TODO: Get show_by_date working. You can change the date format for everything to be with dashes instead, or you could 
# just send it over as a string and parse it on the backend. Or you could make the shift to datetime. 

# after that, It's probably time to start figuring out the routine thing.