class Users < Api

  namespace :users, desc: "User Related Operations" do
    
    get "/" do
      { status: true, message: "API Called" }
    end

    desc "User registration API"
    params do
      requires :name, type: String, desc: "Name", documentation: { param_type: "body" }
      requires :email, type: String, desc: "Email Address", documentation: { param_type: "body" }
      requires :phone, type: String, desc: "Phone", documentation: { param_type: "body" }
      requires :role, type: Integer, desc: "Role", documentation: { param_type: "body" }
      requires :password, type: String, desc: "Password", documentation: { param_type: "body" }
    end

    post "/" do
      user = User.find_by(email: params[:email])
      if !user.present?
        user = User.new(params)
        if user.save!
          { status: true, data: user.as_json(except: [:created_at, :updated_at]), message: "Registration successful" }
        else
          error!({ status: false, message: user.errors.full_messages.join(", ") }, 400)
        end
      else
        error!({ status: false, message: "User already existed" }, 400)
      end
    end

    desc "User login API"
    params do
      requires :email, type: String, desc: "Email Address", documentation: { param_type: "body" }
      requires :password, type: String, desc: "Password", documentation: { param_type: "body" }
    end

    post "/login" do
      user = User.find_by(email: params[:email])
      if user.present?
        if user.valid_password?(params[:password])
          key = UserToken.create(user_id: user.id)
          { status: true, data: user.user_data(key.access_token), message: "Login successful" }
        else
          error!({ status: false, message: "Email and password do not match" }, 400)
        end
      else
        error!({ status: false, message: "User doesn't exist" }, 400)
      end
    end

    desc "User update API"
    put "/:user_id" do
      user = User.find_by(id: params[:user_id])
      if user.present? && user.update(name: params[:name], phone: params[:phone])
        { 
          status: true, 
          data: {
            name: user.name, 
            phone: user.phone,
            description: user.tour_guide == nil ? nil : user.tour_guide.description,
            languages: user.tour_guide == nil ? nil : user.tour_guide.languages,
          }, 
          message: "User profile updated" 
        }
      else
        error!({ status: false, message: "Something went wrong" }, 400)
      end
    end

    desc "Upload Certificate"
    post "/upload_certificate" do
      puts params
    end

    get "/tour_guides" do
      users = User.where(role: "guide")
      if users
        data = []
        users.map do |user|
          if user.active === true || user.active === nil
            data << user.tour_guide_data
          end
        end
        { status: true, data: data}
      else
        error!({ status: false, message: "Something went wrong" }, 400)
      end
    end

    desc "Approve Guide API"
    put "/tour_guide/:user_id" do
      user = User.find_by(id: params[:user_id])
      if user.present? && user.update(active: params[:active]) 
        params[:active] == true ? TourGuide.create(user_id: user.id) : nil
        { status: true, data: {name: user.name, phone: user.phone}, message: "Login successful" }
      else
        error!({ status: false, message: "Something went wrong" }, 400)
      end
    end

    get "/dashboard" do
      authenticate!
      { status: true, message: "Authentication passed in dashboard", user: current_user }
    end

  end
end
