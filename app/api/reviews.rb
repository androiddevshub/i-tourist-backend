class Reviews < Api

  namespace :reviews, desc: "Reviews related operations" do

    get "/:tour_guide_id" do
      reviews = Review.where(tour_guide_id: params[:tour_guide_id])
      results = reviews.map do |review|
        {
          id: review.id,
          user_name: review.user.name,
          description: review.description
        }
      end
      { status: true, data: results }
    end

    post "/" do
      review = Review.new(params)
      if review.save!
        { status: true, data: review, message: "Review submitted successfully"}
      else
        error!({ status: false, message: "Something went wrong"}, 400)
      end
    end

  end

end