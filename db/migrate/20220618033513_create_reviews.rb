class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.references :tour_guide
      t.references :user
      t.string :description 
      t.timestamps
    end
  end
end
