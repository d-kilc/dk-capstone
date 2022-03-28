Rails.application.routes.draw do
  # resources :events
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
  patch '/trips/:id', to: 'trips#update'
  delete '/trips/:id', to: 'trips#destroy'

  resources :trips, only: [:show] do
    resources :events, only: [:index]
  end

  post '/events', to: 'events#create'
  delete '/events/:id', to: 'events#destroy'
  patch '/events/:id', to: 'events#update'
  # get '/trips/:id', to: 'trips#show' do
  #   get '/events', to: 'events#show'
  # end

  post '/user_trips', to: 'user_trips#create'
  delete '/user_trips/:id', to: 'user_trips#destroy'

end
