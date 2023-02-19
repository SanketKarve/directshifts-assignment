class ReferralController < ApplicationController
  before_action :authenticate_user!

  def referred_users
    render json: User.where({ referred_code: current_user.referral_code }), status: :ok
  end

  def refer_user
    if params[:email].present?
      user = User.where({ email: params[:email] })
      if user.present?
        render json: { message: 'User already exists.', status: 422 }, status: :unprocessable_entity
      else
        ReferMailer.with(details: {
                           recevier: params['email'],
                           sender_name: current_user.name,
                           referral_code: current_user.referral_code
                         }).refer_user_mail.deliver_later
        render json: { message: 'User succesfully invited.' }, status: :ok
      end
    else
      render json: { message: 'No email found.', status: 404 }, status: 404
    end
  end
end
