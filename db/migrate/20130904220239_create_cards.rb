class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title
      t.integer :list_id

      t.timestamps
    end
  end
end
