class ListsController < ApplicationController
	def index
		@board = Board.find(params[:board_id])
		@lists = @board.lists

		respond_to do |format|
			format.json { render :json => @lists }
		end
	end

	def create
		@board = Board.find(params[:board_id])
		@list = List.new(params[:list])
		@list.board_id = @board.id

		if @list.save()
			render :json => @list
		else
			render :json => @list.errors.full_messages
		end
	end

	def update
		@list = List.find(params[:id])
		@list.update_attributes(params[:list])

		if @list.save()
			render :json => @list
		else
			render :json => @list.errors.full_messages
		end
	end

	def destroy
		@list = List.find(params[:id])
		@list.destroy()

		render :json => @list
	end
end
