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

  def self.create_defaults1(list_id)
    Card.new({title: "This is a card.", list_id: list_id}).save
    Card.new({title: "Cards are contained inside lists. This list is called 'To Do'.", list_id: list_id}).save
  	card1 = Card.new({title: "Click on me to see or edit details.", list_id: list_id})
  	card1.due_date = 1380610800000
  	card1.save
  	Comment.new({body: "Due dates are color coded according to how much time is left.", card_id: card1.id}).save
  	Comment.new({body: "Hover over the bottom of this modal to edit details", card_id: card1.id}).save
  end

  def self.create_defaults2(list_id)
    Card.new({title: "You can move cards around to change their order or even move them to a different list.", list_id: list_id}).save
    card1 = Card.new({title: "Lists can be moved around as well.", list_id: list_id})
  	card1.due_date = 1388563200000
  	card1.save
  end

  def self.create_defaults3(list_id)
    Card.new({title: "You can click on almost any title to rename it.", list_id: list_id}).save
    Card.new({title: "Try deleting lists, creating new ones, deleting cards, etc. Don't worry, this is a Demo account, so your changes won't be saved.", list_id: list_id}).save
    Card.new({title: "Try resizing your browser window and watch how the lists react.", list_id: list_id}).save
  end
end
