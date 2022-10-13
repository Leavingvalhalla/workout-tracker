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
        if workout
            lifts = Lift.select('lifts.*, user_lifts.*').joins(:user_lifts).where('user_lifts.workout_id =?', workout.id)
            render json: lifts, status: :ok
        else
            render json: {error: 'no such workoutId'}, status: :unprocessable_entity
        end
    end

    def show_by_lift_id
        lift = UserLift.find(params[:id])
        render json: UserLift.select('weight', 'reps').where('lift_id = ? and workout_id = ?', lift.lift_id, lift.workout_id), status: :ok
    end

end