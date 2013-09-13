class UsersController < ApplicationController
  before_filter :require_current_user!, :only => [:show]
  before_filter :require_no_current_user!, :only => [:create, :new]

  def create
    @user = User.new(params[:user])

    if @user.save
      self.current_user = @user
      @board = Board.new(title: "My First Board", user_id: @user.id)
      @board.save

      List.create_defaults(@board.id)

      lists = @board.lists
      list = lists.first

      Card.new({title: "This is a card. You can move me around or click on me to add details.", list_id: list.id}).save
      Card.new({title: "You can also move lists around.", list_id: list.id}).save
      Card.new({title: "You click on almost any title to rename it.", list_id: list.id}).save

      redirect_to boards_url
    else
      render :json => @user.errors.full_messages
    end
  end

  def new
    @user = User.new
  end

  def show
    if params.include?(:id)
      @user = User.find(params[:id])
    else
      redirect_to user_url(current_user)
    end
  end
end
