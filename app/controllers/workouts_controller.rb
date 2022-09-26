class WorkoutsController < ApplicationController

    def create
        render json: Workout.create(user_id: params[:user_id], date: params[:date]), status: :created
    end

    def show
        render json: Workout.where(user_id: params[:id])
    end

    def show_by_date
        date = Date.parse(params[:date])
        workout = Workout.where(date: date, user_id: session[:user_id]).first
        lifts = Lift.select('lifts.*, user_lifts.*').joins(:user_lifts).where('user_lifts.workout_id =?', workout.id)
        byebug
        render json: lifts
    end

end