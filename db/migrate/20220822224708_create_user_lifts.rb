class CreateUserLifts < ActiveRecord::Migration[7.0]
  def change
    create_table :user_lifts do |t|
      t.integer :user_id
      t.integer :lift_id
      t.integer :weight
      t.integer :reps
      t.string :date
      t.timestamps
    end
  end
end
