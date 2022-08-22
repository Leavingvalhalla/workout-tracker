Rails.application.routes.draw do
  resources :user_lifts
  resources :routine_lifts
  resources :workout_lifts
  resources :routines
  resources :lifts
  resources :workouts
  resources :users

  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
