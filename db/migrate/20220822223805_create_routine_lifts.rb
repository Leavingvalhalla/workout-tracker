class CreateRoutineLifts < ActiveRecord::Migration[7.0]
  def change
    create_table :routine_lifts do |t|
      t.integer :routine_id
      t.float :weight
      t.integer :reps
      t.integer :lift_id
      t.integer :position
      t.integer :index
      t.boolean :amrap
      t.timestamps
    end
  end
end
