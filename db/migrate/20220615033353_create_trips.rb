class CreateTrips < ActiveRecord::Migration[6.1]
  def change
    create_table :trips do |t|
      t.references :destination
      t.references :tour_guide
      t.timestamps
    end
  end
end
