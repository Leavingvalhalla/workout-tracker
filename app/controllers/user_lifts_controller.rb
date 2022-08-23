class UserLiftsController < ApplicationController

    def create
        new_lift = UserLift.new(lift_params)
        render json: new_lift, status: :ok
    end


    private

    def lift_params
        params.permit(:user_id, :lift_id, :weight, :reps)
    end

end
