class BoardsController < ApplicationController
	before_filter :require_current_user!

	def index
		@boards = current_user.boards

		respond_to do |format|
			format.html { render :index }
			format.json { render :json => @boards }
		end
	end

	def show
		@board = Board.find(params[:id])

		respond_to do |format|
			format.html { render :show }
			format.json { render :json => @board }
		end
	end

	def create
		@board = Board.new(params[:board])
		@board.user_id = current_user.id
		if @board.save
			redirect_to boards_url
		else
			render :json => @board.errors.full_messages
		end
	end

	def update

	end

	def destroy

	end
end
