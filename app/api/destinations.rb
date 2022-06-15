class Destinations < Api

  namespace :destinations, desc: "Destination related operations" do


    get "/" do
      destinations = Destination.all
      { status: true, data: destinations }
    end

    post "/" do
      destination = Destination.new(params)
      if destination.save!
        { status: true, data: destination }
      else
         error!({ status: false, message: "Something went wrong" }, 400)
      end
    end

    put "/:id" do
      destination = Destination.find_by(id: params[:id])
      if destination && destination.update(params)
        { status: true, data: destination }
      else
         error!({ status: false, message: "Something went wrong" }, 400)
      end
    end

  end

end