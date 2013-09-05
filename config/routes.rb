Tamello::Application.routes.draw do
  resources :users, :only => [:new, :create, :show]

  resources :boards, :only => [:index, :show, :create, :update, :destroy] do
  	resources :lists, :only => [:index]
  end

  resources :lists, :only => [:show, :create, :update, :destroy] do
  	resources :cards, :only => [:index]
  end

  resources :cards, :only => [:show, :create, :update, :destroy]

  resource :session, :only => [:new, :create, :destroy]
  
  root :to => "boards#index"
end
