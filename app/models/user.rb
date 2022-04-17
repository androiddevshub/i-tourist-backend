class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  enum role: ["admin", "tourist", "guide"]

  def user_data(token)
    {
      id: id,
      name: name,
      email: email,
      phone: phone,
      role: role,
      token: token,
    }
  end        
end
