class RoutineLiftsController < ApplicationController

    def show
    user = User.find(session[:user_id])
    maxes = Lift.select('name, maxes.max, routine_lifts.amrap, 
        routine_lifts.weight, routine_lifts.reps').joins(:maxes, :routine_lifts)
        .where('maxes.user_id = ? and routine_lifts.routine_id = ? and routine_lifts.position = ?', user.id, user.routine_id, user.routine_position)
    routine_lifts = RoutineLift.where(routine_id: params[:routine_id], position: params[:position])
    
    render json: maxes

    end

end
