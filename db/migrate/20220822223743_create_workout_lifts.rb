class CreateWorkoutLifts < ActiveRecord::Migration[7.0]
  def change
    create_table :workout_lifts do |t|
      t.integer "workout_id"
      t.integer "lift_id"
      t.timestamps
    end
  end
end
