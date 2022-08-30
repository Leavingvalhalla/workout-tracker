class UserLiftsController < ApplicationController

    def create
        lift_id = Lift.find_by(name: params[:lift_name])
        new_lift = UserLift.create!(workout_id: params[:workout_id], lift_id: lift_id.id, weight: params[:weight], reps: params[:reps])
        render json: {lift_name: params[:lift_name], weight: params[:weight], reps: params[:reps]}, status: :ok
    end


    # TODO: Create join table that can pass on lift_name, rather than just lift_id
    def show
        # workout_ids = Workout.where(user_id: session[:user_id])

        render json: Workout.joins(:user_lifts)

        end

        # .where(user_id: params[:user_id])
        # render json: UserLift.where(user_id: params[:user_id]), status: :ok


    private

    # def lift_params
    #     params.permit(:user_id, :lift_id, :weight, :reps, :date)
    # end

end
