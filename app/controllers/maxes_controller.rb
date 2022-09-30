class MaxesController < ApplicationController

    def create
        lift = Lift.find_by(name: params[:lift])
        render json: Max.create(user_id: params[:user_id], lift_id: lift.id, lift_max: params[:lift_max]), status: :created
        
        # if params[:goal]
            # render json: Max.create(user_id: params[:user_id], lift_id: lift.id, goal: params[:goal], lift_max: params[:lift_max]), status: :created
        # else
            # render json: Max.create(user_id: params[:user_id], lift_id: lift.id, lift_max: params[:lift_max]), status: :created
        # end
    end

    def update
        lift = Lift.find_by(name: params[:lift])
        max = Max.where('lift_id = ? and user_id = ?', lift.id, session[:user_id]).first            
        max.update(lift_max: params[:lift_max])
        render json: max, status: :ok
    end


    def index
        maxes = Max.where(user_id: session[:user_id])
        maxes_array = []
        (maxes).each do |max|
            if max.lift_max != 0
                lift = Lift.find(max.lift_id)
                maxes_array << lift.name
            end
        end
        render json: maxes_array
    end

end
