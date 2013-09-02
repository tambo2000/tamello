class AddColumnsToUser < ActiveRecord::Migration
  def change
  	add_column :users, :username, :string
  	add_column :users, :password_digest, :string
  	add_column :users, :name, :string

  end
end
