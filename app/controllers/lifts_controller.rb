class LiftsController < ApplicationController

    def index
        render json: Lift.all, status: :ok
    end

    def getId
        render json: Lift.find_by(name: params[:lift_name]), status: :ok
    end

    def create
        lift = Lift.create!(name: params[:lift_name])
        render json: lift, status: :created
        rescue ActiveRecord::RecordInvalid => invalid
            render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity

    end

end
