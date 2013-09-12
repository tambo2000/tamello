class Card < ActiveRecord::Base
  attr_accessible :list_id, :title, :position, :due_date

  belongs_to :list

  has_many :comments,
  	:dependent => :destroy

  def initialize(options = {})
  	# set the position attribute to the last position for the collection
  	options[:position] = List.find(options[:list_id]).cards.count

  	super(options)
  end
end
