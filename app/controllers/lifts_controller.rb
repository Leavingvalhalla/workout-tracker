class LiftsController < ApplicationController

    def index
        render json: Lift.all, status: :ok
    end

    def getId
        render json: Lift.find_by(name: params[:liftName]), status: :ok
    end

    def create
        render json: Lift.create(name: params[:liftName]), status: :created
    end

end
