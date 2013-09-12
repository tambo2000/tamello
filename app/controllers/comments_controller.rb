class CommentsController < ApplicationController
	def index
		@card = Card.find(params[:card_id])
		@comments = @card.comments

		render :json => @comments
	end

	def show
		@comment = Comment.find(params[:id])

		render :json => @comment
	end

	def create
		@comment = Comment.new(params[:comment])

		if @comment.save
			render :json => @comment
		end
	end

	def destroy
		@comment = Comment.find(params[:id])
		@comment.destroy()

		render :json => @comment
	end
end
