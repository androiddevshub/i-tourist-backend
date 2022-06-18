class Trip < ApplicationRecord
  belongs_to :destination
  belongs_to :tour_guide
end
