class CreateTourGuides < ActiveRecord::Migration[6.1]
  def change
    create_table :tour_guides do |t|
      t.references :user
      t.string :description
      t.integer :reviews
      t.integer :rating
      t.string :languages
      t.timestamps
    end
  end
end
