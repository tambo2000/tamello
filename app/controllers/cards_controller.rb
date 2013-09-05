class CardsController < ApplicationController
	def index
		@list = List.find(params[:list_id])
		@cards = @list.cards

		render :json => @cards
	end

	def create

		p params
		@card = Card.new(params[:card])

		if @card.save
			render :json => @card
		end
	end
end
