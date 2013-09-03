class Board < ActiveRecord::Base
  attr_accessible :description, :title, :user_id

  belongs_to :user

  def initialize(options = {})
  	options.reverse_merge!(
  		:title => "New Board",
  		:description => "No description"
  		)

  	super(options)
  end
end
