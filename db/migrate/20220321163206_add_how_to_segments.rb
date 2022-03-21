class AddHowToSegments < ActiveRecord::Migration[6.1]
  def change
    add_column :segments, :how, :string
  end
end
