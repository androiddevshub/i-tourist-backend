class Destination < ApplicationRecord
  has_many :trips
  has_many :bookings
end
