class CardsController < ApplicationController
	def index
		@list = List.find(params[:list_id])
		@cards = @list.cards

		render :json => @cards
	end

	def show
		@card = Card.find(params[:id])

		render :json => @card
	end

	def create
		@card = Card.new(params[:card])

		if @card.save
			render :json => @card
		end
	end

	def update
		@card = Card.find(params[:id])
		@card.update_attributes(params[:card])

		if @card.save()
			render :json => @card
		else
			render :json => @card.errors.full_messages,
			:status => 422
		end
	end

end
