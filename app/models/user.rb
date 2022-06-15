class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  enum role: ["admin", "tourist", "guide"]
  has_one :tour_guide

  def user_data(token)
    {
      id: id,
      name: name,
      email: email,
      phone: phone,
      tour_guide_id: self.tour_guide == nil ? nil : self.tour_guide.id,
      role: role,
      active: active,
      token: token,
    }
  end  
  
  def tour_guide_data
    {
      id: id,
      name: name,
      email: email,
      phone: phone,
      certificate_url: certificate_url,
      active: active,
    }
  end
end
