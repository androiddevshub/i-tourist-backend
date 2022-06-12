class CreateDestinations < ActiveRecord::Migration[6.1]
  def change
    create_table :destinations do |t|
      t.string :name
      t.string :description
      t.string :location
      t.integer :reviews
      t.integer :rating
      t.integer :price
      t.timestamps
    end
  end
end
