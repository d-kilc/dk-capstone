Rails.application.routes.draw do
  # resources :segments
  # resources :user_groups
  # resources :groups
  # resources :user_trips
  # resources :trips
  resources :users

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/me', to: 'users#show'

  get '/groups/:id', to: 'groups#show'

  post '/trips', to: 'trips#create'
  get '/trips/:id', to: 'trips#show'

end
