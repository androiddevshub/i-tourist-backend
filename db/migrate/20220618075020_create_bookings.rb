class CreateBookings < ActiveRecord::Migration[6.1]
  def change
    create_table :bookings do |t|
      t.references :user
      t.references :tour_guide
      t.references :destination
      t.timestamps
    end
  end
end
