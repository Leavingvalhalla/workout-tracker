require 'date'

class UserLiftsController < ApplicationController

    def create
        lift_id = Lift.find_by(name: params[:lift_name])
        new_lift = UserLift.create!(workout_id: params[:workout_id], lift_id: lift_id.id, weight: params[:weight], reps: params[:reps])
        render json: {lift_name: params[:lift_name], weight: params[:weight], reps: params[:reps]}, status: :ok
    end

    
    def show
        lifts = Workout.select('workouts.*, user_lifts.*').joins(:user_lifts).where(id: params[:id])
        lifts_array = []
        lifts.each do |lift|
            lift_with_name = Lift.select('lifts.name').where(id: lift.lift_id)
            lifts_array << {lift_id: lift.lift_id, workout_id: lift.workout_id, weight: lift.weight, reps: lift.reps, name: lift_with_name[0].name}
        end
        render json: lifts_array
    end

    def get_chart
        lift = Lift.find_by(name: params[:lift_name])
        user = User.find(session[:user_id])
        today = DateTime.now
        
        workouts_all_dates Workout.select('workouts.*, user_lifts.*').joins(:user_lifts).where(['user_lifts.lift_id = ? and user_id = ?', lift.id, user.id])

        if params[:period] == '1m'
            period = 30
        elsif params[:period == '3m']
            period = 60
        elsif params[:period == '6m']
            period = 180
        elsif params[:period == '1y']
            period = 365
        else
            period = false
        end

        if period
            workouts = workouts_all_dates.filter |workout| workout.date.to_date > today - period
        else
            workouts = workouts_all_dates
        end
        
        
        # if params[:chart] == 'Max Weight'


        
    end


    def update
        lift = UserLift.find(params[:id])
        name = Lift.find(params[:lift_id])
        lift.update(lift_id: params[:lift_id], workout_id: params[:workout_id], weight: params[:weight], reps: params[:reps])
        render json: {name: name.name, lift_id: params[:lift_id], workout_id: params[:workout_id], weight: params[:weight], reps: params[:reps]}, status: :ok
        
    end

    def destroy
        lift = UserLift.find(params[:id])
        lift.destroy

    end
end
