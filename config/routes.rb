Rails.application.routes.draw do
  resources :user_lifts, only: [:create, :show]
  resources :workouts, only: [:create, :show]
  resources :routine_lifts
  resources :routines
  resources :users, only: [:create, :show]
  resources :lifts, except: [:destroy, :update, :show]

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get 'lifts/:liftName', to: 'lifts#getId'
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
