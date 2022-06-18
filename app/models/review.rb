class Review < ApplicationRecord
  belongs_to :user
  belongs_to :tour_guide
end
