class ListsController < ApplicationController
	def index
		@board = Board.find(params[:board_id])
		@lists = @board.lists

		# render :json => @lists

		respond_to do |format|
			format.json { render :json => @lists }
		end
	end

	def create
		@list = List.new(params[:list])
		@list.board_id = params[:board_id]

		if @list.save()
			render :json => @list
		else
			render :json => @list.errors.full_messages
		end
	end
end
