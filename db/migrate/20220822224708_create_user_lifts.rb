class CreateUserLifts < ActiveRecord::Migration[7.0]
  def change
    create_table :user_lifts do |t|
      t.integer :lift_id
      t.integer :workout_id
      t.float :weight
      t.integer :reps
      t.timestamps
    end
  end
end
