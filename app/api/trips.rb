class Trips < Api

  namespace :trips, desc: "Trip Related Operations" do

     get "/:id/tour_guides" do
      tour_guide_ids = Trip.where(destination_id: params[:id]).collect(&:tour_guide_id).uniq
      tour_guides = tour_guide_ids.map do |id|
        tour_guide = TourGuide.find(id)
        {
          id: tour_guide.id,
          name: tour_guide.user.name,
          description: tour_guide.description,
          languages: tour_guide.languages
        }
      end
      { status: true, data: tour_guides }
     
    end

  end
end