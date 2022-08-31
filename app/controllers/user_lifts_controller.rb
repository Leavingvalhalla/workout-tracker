class UserLiftsController < ApplicationController

    def create
        lift_id = Lift.find_by(name: params[:lift_name])
        new_lift = UserLift.create!(workout_id: params[:workout_id], lift_id: lift_id.id, weight: params[:weight], reps: params[:reps])
        render json: {lift_name: params[:lift_name], weight: params[:weight], reps: params[:reps]}, status: :ok
    end


    # TODO: Create join table that can pass on lift_name, rather than just lift_id
    def show
        info = Workout.where(user_id: session[:user_id])
        
        array = []
        info.each do |x|
            lift = UserLift.find(x.id)
            array << {date: x.date, weight: lift.weight, reps: lift.reps, id: x.id}
        end

        render json: array

    end

        # .where(user_id: params[:user_id])
        # render json: UserLift.where(user_id: params[:user_id]), status: :ok


    def update
        lift = UserLift.find(params[:id])
        lift.update(lift_id: params[:lift_id], workout_id: params[:workout_id], weight: params[:weight], reps: params[:reps])
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
