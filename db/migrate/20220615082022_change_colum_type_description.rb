class ChangeColumTypeDescription < ActiveRecord::Migration[6.1]
  def change
    change_column :tour_guides, :description, :text
    change_column :destinations, :description, :text
  end
end
