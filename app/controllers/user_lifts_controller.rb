class UserLiftsController < ApplicationController

    def create
        lift_id = Lift.find_by(name: params[:lift_name])
        new_lift = UserLift.create!(workout_id: params[:workout_id], lift_id: lift_id.id, weight: params[:weight], reps: params[:reps])
        render json: {lift_name: params[:lift_name], weight: params[:weight], reps: params[:reps]}, status: :ok
    end


    # TODO: Figure out the best way to get all the workouts and their details.
    #  it seems cleanest tomake a call to workouts_controller that just gets Workouts.where(user_id: param[:id]),
    #  but then you'll have to make a call when you click a workout to render the specifics. Maybe that's fine?

    #  Alternately, you could get all the data at once, and find a way to filter the dates so they don't render a bunch
    #  of times, but then you have all the data already. This feels clunkier but may have some benefit you haven't thought
    #  of yet.
    
    
    def show

        render json: Workout.joins(:user_lifts).where(user_id: session[:user_id])
        # seen = []
        # unique_workouts = []
        # all_workouts.filter do |workout|
        #     if !seen.include? workout.
        #         unique_workouts.append(workout)
        #     end
        # end
        # render json: unique_workouts
        # info = Workout.where(user_id: session[:user_id])
        # array = []
        # info.each do |x|
        #     lift = UserLift.find(x.id)
        #     array << {date: x.date, weight: lift.weight, reps: lift.reps, id: x.id, user_lift_id: lift.id}
        # end

        # render json: array

    end

        # .where(user_id: params[:user_id])
        # render json: UserLift.where(user_id: params[:user_id]), status: :ok


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


    private

    # def lift_params
    #     params.permit(:user_id, :lift_id, :weight, :reps, :date)
    # end

end
