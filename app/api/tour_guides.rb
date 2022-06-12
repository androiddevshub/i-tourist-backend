class TourGuides < Api

  namespace :tour_guides, desc: "User Related Operations" do

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