class MaxesController < ApplicationController

    def create
        lift = Lift.find_by(name: params[:lift])
        if params[:goal]
            render json: Max.create(user_id: params[:user_id], lift_id: lift.id, goal: params[:goal], max: params[:max]), status: :created
        else
            render json: Max.create(user_id: params[:user_id], lift_id: lift.id, max: params[:max]), status: :created
        end
    end

    def show
        maxes = Max.where(user_id: session[:user_id])
        maxes_array = []
        (maxes).each do |max|
            if max.max != 0
                lift = Lift.find(max.lift_id)
                maxes_array << lift.name
            end
        end
        render json: maxes_array
    end

end
