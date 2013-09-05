class Card < ActiveRecord::Base
  attr_accessible :list_id, :title

  belongs_to :list
end
