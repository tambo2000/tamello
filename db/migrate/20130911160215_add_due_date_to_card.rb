class AddDueDateToCard < ActiveRecord::Migration
  def change
  	add_column :cards, :due_date, :integer

  	add_index :boards, :user_id
  	add_index :lists, :board_id
  	add_index :cards, :list_id
  end
end
