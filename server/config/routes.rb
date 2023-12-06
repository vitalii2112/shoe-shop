Rails.application.routes.draw do
  resources :items, except: [:show]
  resources :orders, only: [:create, :show, :index]
  get 'orders/user/:user_id', to: 'orders#user_orders'

  devise_for :users, path: 'auth', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'register'
  }, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  devise_scope :user do
    get 'auth/me', to: 'users#index'
    patch 'auth/me', to: 'users#update_me'
    get 'users/:id', to: 'users#show'
    get 'users', to: 'users#show_all'
    patch 'users/:id', to: 'users#update'
    delete 'users/:id', to: 'users#destroy'
  end

end
