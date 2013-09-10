class List < ActiveRecord::Base
  attr_accessible :board_id, :title, :position

  belongs_to :board

  has_many :cards,
    :dependent => :destroy

  def initialize(options = {})
  	options[:position] = Board.find(options[:board_id]).lists.count

  	super(options)
  end

  def self.create_defaults(board_id)
  	titles = ["To Do", "Doing", "Done"]
  	titles.each do |title|
  		List.new(title: title, board_id: board_id).save
    end
  end
  
end
