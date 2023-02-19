Rails.application.routes.draw do
  root 'home#index'
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  get 'referral/referred-users' => 'referral#referred_users'
  post 'referral/refer-user' => 'referral#refer_user'
  get 'sign-in' => 'home#index'
  get 'sign-up' => 'home#index'
end
