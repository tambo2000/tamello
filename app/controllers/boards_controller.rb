class BoardsController < ApplicationController
	before_filter :require_current_user!

	def index
		@boards = current_user.boards
		render :index
	end

	def create

	end

	def update

	end

	def destroy

	end
end