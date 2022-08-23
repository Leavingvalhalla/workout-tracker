class UserLiftsController < ApplicationController

    def create
        UserLift.new(lift_params)
    end


    private

    def lift_params
        params.permit(:user_id, :lift_id, :weight, :reps)
    end

end
