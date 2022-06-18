class TourGuide < ApplicationRecord
  belongs_to :user
  has_many :reviews
  has_many :trips
  has_many :bookings
end
