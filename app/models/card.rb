class Card < ActiveRecord::Base
  attr_accessible :list_id, :title, :position

  belongs_to :list

  def initialize(options = {})
  	p "options #{options[:list_id]}"

  	options[:position] = List.find(options[:list_id]).cards.count

  	super(options)
  end
end
