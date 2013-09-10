class Board < ActiveRecord::Base
  attr_accessible :description, :title, :user_id

  belongs_to :user

  has_many :lists,
    :dependent => :destroy


  def initialize(options = {})
  	options.reverse_merge!(
  		:title => "New Board",
  		:description => "No description"
  		)

  	options[:title] = "New Board" if options[:title] == ""
  	options[:description] = "No description" if options[:description] == ""

  	super(options)
  end

end
