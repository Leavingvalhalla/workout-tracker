Rails.application.routes.draw do
  resources :routines
  resources :lifts
  resources :workouts
  resources :users

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
end
