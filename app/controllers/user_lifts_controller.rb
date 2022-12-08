require 'date'

class UserLiftsController < ApplicationController

    def create
        lift_id = Lift.find_by(name: params[:lift_name])
        new_lift = UserLift.create!(workout_id: params[:workout_id], lift_id: lift_id.id, weight: params[:weight], reps: params[:reps])
        render json: {lift_name: params[:lift_name], weight: params[:weight], reps: params[:reps], id: new_lift.id, lift_id: new_lift.lift_id}, status: :ok
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
        user = User.find(session[:user_id])
        lift = Lift.find_by(name: params[:lift_name])
        workouts_all_dates = Workout.select('workouts.*, user_lifts.*').joins(:user_lifts)
        .where(['user_lifts.lift_id = ? and user_id = ?', lift.id, user.id])

        workouts = parse_period(workouts_all_dates, params[:period])
    
        # separate section just for the Workout Volume, since method for deriving data is so different
        if workouts  == []
            render json: {error: 'no such data'}, status: :unprocessable_entity
        else
            if params[:chart] == 'Workout Volume'
                workout_array = parse_volume()
            else
                workout_array = parse_non_volume_data()
            end
            render json: workout_array, status: :ok
        end     
    end

    def parse_period(workouts_all_dates, period)
        case period
        when '1m'
            num = 30
        when '3m'
            num = 60
        when '6m'
            num = 180
        when '1y'
            num = 365
        else
            false
        end

        # selects workouts for selected period, else case is for all workouts
        if num
            today = DateTime.now
            workouts_all_dates.filter {|workout| workout.date.to_date > today - num}
        else
            workouts_all_dates
        end
        
    end


    # helper function to calculate most of the possible chart data
    def is_bigger(current, max)
        case params[:chart]
        when 'Max Weight'
            current.weight > max.weight ? true : false
        when 'Max Reps'
            current.reps > max.reps ? true : false
        when '1RM'
            current.reps * current.weight * 0.0333 + current.weight > max.reps * max.weight * 0.0333 + max.weight ? true : false
        end
    end


    def parse_volume
        workout_array = []
        date = workouts[0].date
        workout_volume = 0
        workouts.each do |workout|
            if workout == workouts[-1]
                workout_volume += workout.reps * workout.weight
                workout_array << {date: workout.date, volume: workout_volume}
            elsif workout.date == date
                workout_volume += workout.reps * workout.weight
            else
                workout_array << {date: workout.date, volume: workout_volume}
                date = workout.date
                workout_volume = workout.reps * workout.weight
            end
        end
        workout_array
    end

    def parse_non_volume_workouts
        workout_array = []
        id = workouts[0].workout_id
        max = workouts[0]
        workouts.each do |workout|
            if workout == workouts[-1]
                if is_bigger(workout, max)
                    max = workout
                end
                workout_array << max
            elsif workout.workout_id == id
                if is_bigger(workout, max)
                    max = workout
                end
            else
                workout_array << max
                id = workout.workout_id
                max = workout
            end
        end
        workout_array
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
