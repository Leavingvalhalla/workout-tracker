class WorkoutsController < ApplicationController

    def create
        render json: Workout.create(user_id: params[:user_id], date: params[:date]), status: :created
    end

end
