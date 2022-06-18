class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :tour_guide
  belongs_to :destination
end
