class RoutineLiftsController < ApplicationController

    def create
        lift = Lift.find_by(name: params[:liftName])
        routine_lift = RoutineLift.create!(lift_id: lift.id, 
            index: params[:index], position: params[:position], weight: params[:weight], 
            reps: params[:reps], amrap: params[:amrap], routine_id: params[:routineId])
        render json: routine_lift, status: :created
        rescue ActiveRecord::RecordInvalid => invalid
            render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def destroy
        routine_lift = RoutineLift.find(params[:id])
        routine_lift.destroy
    end


    # retrieves all the details for next workout in user's routine
    def show
    user = User.find(session[:user_id])
    maxes = Lift.select('name, maxes.lift_max, routine_lifts.amrap, 
        routine_lifts.weight, routine_lifts.reps').joins(:maxes, :routine_lifts)
        .where('maxes.user_id = ? and routine_lifts.routine_id = ? and routine_lifts.position = ?',
             user.id, user.routine_id, user.routine_position).order('routine_lifts.index ASC')
    render json: maxes

    end

    # just gets the actual lift names, just used for setting maxes
    def all_lifts_for_routine
        render json: Lift.joins(:routine_lifts).where('routine_lifts.routine_id = ?',
             params[:id]).distinct, status: :ok
    end

    def full_lift_info_for_routine
        lifts = RoutineLift.where('routine_id = ?', params[:id])
        render json: lifts, status: :ok
    end

end
