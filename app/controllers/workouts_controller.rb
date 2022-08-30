class WorkoutsController < ApplicationController

    def create
        render json: Workout.create(user_id: params[:user_id], date: params[:date]), status: :created
    end

    def show
        lifts = UserLift.where(workout_id: params[:id])
        
        array = []
        lifts.each do |lift|
            lift_name = Lift.find(lift.lift_id)
            array << {id: lift.id, name: lift_name.name, reps: lift.reps, weight: lift.weight, workout_id: lift.workout_id, lift_id: lift.workout_id}
        end
        render json: array
    end

end
