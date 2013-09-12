class ChangeDateType < ActiveRecord::Migration
  def change
  	change_column :cards, :due_date, :bigint 
  end
end
