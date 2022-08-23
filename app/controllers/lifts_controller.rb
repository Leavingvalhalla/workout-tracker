class LiftsController < ApplicationController

    def index
        render json: Lift.all, status: :ok
    end

    def show
        render json: Lift.find_by(name: params[:liftname])
    end
    
end
