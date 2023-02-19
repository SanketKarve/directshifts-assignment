class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
  before_create :generate_referral_code

  def jwt_payload
    super
  end

  def generate_referral_code
    loop do
      self.referral_code = SecureRandom.urlsafe_base64(9).gsub(/-|_/, ('a'..'z').to_a[rand(26)])
      break referral_code unless User.exists?(referral_code: referral_code)
    end
  end
end
