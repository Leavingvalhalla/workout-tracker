Rails.application.routes.draw do
  resources :maxes, except: [:destroy]
  resources :user_lifts
  resources :workouts, only: [:create, :show]
  resources :users, except: [:destroy]
  resources :lifts, only: [:create, :index]
  resources :routines, only: [:create, :index]
  resources :routine_lifts, only: [:create, :destroy]

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get 'lifts/:lift_name', to: 'lifts#getId'
  get 'chart/:lift_name/:period/:chart', to: 'user_lifts#get_chart'
  get '/gif', to: 'users#get_gif'
  get '/workouts/byDate/:date', to: 'workouts#show_by_date'
  get 'routine_lifts/:routine_id/:position', to: 'routine_lifts#show'
  get 'routine_lifts/:id', to: 'routine_lifts#all_lifts_for_routine'
  get '/finish_routine_workout', to: 'users#finish_routine_workout'
  get '/workout_by_lift_id/:id', to: 'workouts#show_by_lift_id' 
  get '/custom_routine_names', to: 'routines#get_custom_names'
  get '/all_routine_lifts/:id', to: 'routine_lifts#full_lift_info_for_routine'
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
