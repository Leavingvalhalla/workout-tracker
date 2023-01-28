class RoutinesController < ApplicationController
    def get_custom_names
        routines = Routine.select('name, id').where('id > ?', 3)
        render json: routines
    end

    def create
        routine = Routine.create(name: params[:name])
        render json: routine, status: :ok
    end
end
