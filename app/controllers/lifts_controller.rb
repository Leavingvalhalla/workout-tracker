class LiftsController < ApplicationController

    def index
        render json: Lift.all, status: :ok
    end

    def getId
        render json: Lift.find_by(name: params[:lift_name]), status: :ok
    end

    def create
        render json: Lift.create(name: params[:lift_name]), status: :created
    end

end
