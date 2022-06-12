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
