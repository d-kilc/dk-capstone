class CreateSegments < ActiveRecord::Migration[6.1]
  def change
    create_table :segments do |t|
      t.string :from
      t.string :to
      t.string :when
      t.references :trip, null: false, foreign_key: true
      t.integer :trip_sequence

      t.timestamps
    end
  end
end
