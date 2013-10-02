require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessible :username, :password
  attr_reader :password

  validates :password_digest, :presence => { :message => "Password can't be blank" }
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  validates :session_token, :username, :presence => true

  after_initialize :ensure_session_token

  has_many :boards,
    :dependent => :destroy

  def self.find_by_credentials(username, password)
  	user = User.find_by_username(username)

  	if user.nil?
  		return nil
  	end

  	if BCrypt::Password.new(user.password_digest).is_password?(password)
  		return user
  	end

  	nil
  end

  def password=(password)
  	@password = password
  	self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
  	self.session_token = SecureRandom::urlsafe_base64(16)
  	self.save!
  end

  def create_defaults
    Board.create_defaults(self.id)
    board = self.boards.first

    List.create_defaults(board.id)
    lists = board.lists

    Card.create_defaults1(lists[0].id)
    Card.create_defaults2(lists[1].id)
    Card.create_defaults3(lists[2].id)
  end

  private
  def ensure_session_token
  	self.session_token ||= SecureRandom::urlsafe_base64(16)
  end

end
