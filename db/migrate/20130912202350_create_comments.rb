class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body
      t.integer :card_id

      t.timestamps
    end

    add_index :comments, :card_id
  end
end
