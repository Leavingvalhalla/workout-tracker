class CreateRoutines < ActiveRecord::Migration[7.0]
  def change
    create_table :routines do |t|
      t.string :name
      t.string :summary
      t.string :sample
      t.timestamps
    end
  end
end
