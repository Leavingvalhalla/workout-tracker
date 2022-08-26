Rails.application.routes.draw do
  resources :user_lifts
  resources :routine_lifts
  resources :workout_lifts
  resources :routines
  resources :workouts
  resources :users

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/newset', to: 'user_lifts#create'
  get '/lifts/all', to: 'lifts#index'
  get '/lifts/:liftname', to: 'lifts#show'
  get '/all_workouts/:user', to: 'workouts#show'
  post '/add_workout', to: 'workouts#create'
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
