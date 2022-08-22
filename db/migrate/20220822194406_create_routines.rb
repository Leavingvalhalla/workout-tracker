class CreateRoutines < ActiveRecord::Migration[7.0]
  def change
    create_table :routines do |t|

      t.timestamps
    end
  end
end
