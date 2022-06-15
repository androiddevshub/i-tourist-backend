class TourGuides < Api

  namespace :tour_guides, desc: "User Related Operations" do

    get "/:id/assign_new_trips" do
      assigned_destinations = Trip.where(tour_guide_id: params[:id]).collect(&:destination_id)
      all_destinations = Destination.all.collect(&:id)
      left_destinations = all_destinations - assigned_destinations
      results = left_destinations.map do |id|
        Destination.find(id)
      end
      { status: true, data: results}
    end

    get "/:id/assigned_trips" do
      assigned_destinations = Trip.where(tour_guide_id: params[:id]).collect(&:destination_id)
      results = assigned_destinations.map do |id|
        Destination.find(id)
      end
      { status: true, data: results}
    end

    post "/assign_trip" do
      trip_assigned = Trip.new(params)
      if trip_assigned.save!
        { status: true, message: "Trip assigned to guide"}
      else
        error!({ status: false, message: "Something went wrong" }, 400)
      end
    end

    get "/destination/:id" do
      trips = Trip.where(destination_id: params[:id])
      tour_guides = trips.map do |trip|
        tour_guide = TourGuide.find_by(id: trip.tour_guide_id)
        {
          id: tour_guide.id,
          name: tour_guide.user.name,
          description: tour_guide.description,
          languages: tour_guide.languages
        }
      end
      { status: true, data: tour_guides}
    end


    post "/update_info/:id" do
      tour_guide = TourGuide.find_by(id: params[:id])
      if tour_guide && tour_guide.update(description: params[:description], languages: params[:languages])
        { status: true, data: tour_guide}
      else
        error!({ status: false, message: "Something went wrong" }, 400)
      end
    end

    

  end
end