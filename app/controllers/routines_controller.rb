class RoutinesController < ApplicationController
    def get_custom_names
        routines = Routine.select('name, id').where('id > ?', 3)
        render json: routines
    end

    def create
        Routine.create(name: params[:name])
    end
end
