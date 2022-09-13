class MaxesController < ApplicationController

    def create
        lift = Lift.find_by(name: params[:lift])
        if params[:goal]
            render json: Max.create(user_id: params[:user_id], lift_id: lift.id, goal: params[:goal], max: params[:max]), status: :created
        else
            render json: Max.create(user_id: params[:user_id], lift_id: lift.id, max: params[:max]), status: :created
        end
    end

    

end
