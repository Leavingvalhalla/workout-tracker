class CreateRoutineLifts < ActiveRecord::Migration[7.0]
  def change
    create_table :routine_lifts do |t|
      t.integer :routine_id
      t.integer :lift_id
      t.timestamps
    end
  end
end
