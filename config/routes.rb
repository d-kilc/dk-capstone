Rails.application.routes.draw do

  resources :users

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'

  get '/groups/:id', to: 'groups#show'
  post '/groups', to: 'groups#create'
  patch '/groups/:id', to: 'groups#update'
  delete '/groups/:id', to: 'groups#destroy'

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

  post '/user_trips', to: 'user_trips#create'
  delete '/user_trips/:id', to: 'user_trips#destroy'

  post '/user_groups', to: 'user_groups#create'
  delete '/user_groups/:id', to: 'user_groups#destroy'

  get '/accommodations/:keyword/:when/:until', to: 'accommodations#search'

  get '/flights/:from/:to/:when', to: 'flights#search'

end
