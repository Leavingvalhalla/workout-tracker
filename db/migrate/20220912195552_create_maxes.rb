class CreateMaxes < ActiveRecord::Migration[7.0]
  def change
    create_table :maxes do |t|
      t.integer :lift_id
      t.integer :user_id
      t.integer :lift_max
      t.integer :goal

      t.timestamps
    end
  end
end
