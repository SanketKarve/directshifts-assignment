class ReferMailer < ApplicationMailer
  def refer_user_mail
    @referral_link = "http://localhost:3000/sign-up?referral_code=#{params[:details][:referral_code]}"
    @sender_name = params[:details][:sender_name]
    mail(to: params[:details][:recevier], subject: "#{params[:details][:sender_name]} has refer you to directshift")
  end
end
