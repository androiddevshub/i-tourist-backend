class Bookings < Api

  namespace :bookings, desc: "Bookings related operations" do

    post "/" do
      booking = Booking.new(params)
      if booking.save!
        {status: true, data: booking, message: "Booking successful"}
      else
        error!({ status: false, message: "Something went wrong"}, 400)
      end
    end

    get "/users/:user_id" do
      bookings = Booking.where(user_id: params[:user_id])
      results = bookings.map do |booking|
        {
          id: booking.id,
          destination_name: booking.destination.name,
          destination_location: booking.destination.location,
          destination_description: booking.destination.description,
          tour_guide_id: booking.tour_guide.id,
          tour_guide_name: booking.tour_guide.user.name,
          tour_guide_phone: booking.tour_guide.user.phone,
        }
      end
      {status: true, data: results}
    end

    get "/tour_guides/:tour_guide_id" do
      bookings = Booking.where(tour_guide_id: params[:tour_guide_id])
      results = bookings.map do |booking|
        {
          id: booking.id,
          destination_name: booking.destination.name,
          destination_location: booking.destination.location,
          tourist_id: booking.user.id,
          tourist_name: booking.user.name,
          tourist_phone: booking.user.phone,
        }
      end
      {status: true, data: results}
    end
    
  end
  

end