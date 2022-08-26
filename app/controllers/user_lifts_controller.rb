class UserLiftsController < ApplicationController

    def create
        new_lift = UserLift.create(lift_params)
        render json: new_lift, status: :ok
    end

    def show
        render json:UserLift.where(user_id: params[:user_id]), status: :ok
    end


    private

    def lift_params
        params.permit(:user_id, :lift_id, :weight, :reps, :date)
    end

end
