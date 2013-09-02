require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessible :username, :password
  attr_reader :password

  validates :password_digest, :presence => { :message => "Password can't be blank" }
  # validates :password, :length => { :minumum => 6, :allow_nil => true }
  validates :session_token, :username, :presence => true

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
  	user = User.find_by_username(username)

  	if user.nil?
  		return nil
  	end

  	stored_password = BCrypt::Password.new(user.password_digest)
  	if password == stored_password
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

  private
  def ensure_session_token
  	self.session_token ||= SecureRandom::urlsafe_base64(16)
  end

end
