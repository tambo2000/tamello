Tamello::Application.routes.draw do
  resources :users, :only => [:new, :create, :show]
  resources :boards, :only => [:index, :create, :update, :destroy]
  resource :session, :only => [:new, :create, :destroy]
  
  root :to => "boards#index"
end
