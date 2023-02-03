class RoutinesController < ApplicationController
    
    def index
        render json: Routine.all
    end
    
    def get_custom_names
        routines = Routine.select('name, id').where('id > ?', 4)
        render json: routines
    end

    def create
        routine = Routine.create(name: params[:name])
        render json: routine, status: :ok
    end
end
