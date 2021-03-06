# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130912202350) do

  create_table "boards", :force => true do |t|
    t.string   "title"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.integer  "user_id"
    t.text     "description"
  end

  add_index "boards", ["user_id"], :name => "index_boards_on_user_id"

  create_table "cards", :force => true do |t|
    t.string   "title"
    t.integer  "list_id"
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
    t.integer  "position"
    t.integer  "due_date",   :limit => 8
  end

  add_index "cards", ["list_id"], :name => "index_cards_on_list_id"

  create_table "comments", :force => true do |t|
    t.text     "body"
    t.integer  "card_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "comments", ["card_id"], :name => "index_comments_on_card_id"

  create_table "lists", :force => true do |t|
    t.string   "title"
    t.integer  "board_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "position"
  end

  add_index "lists", ["board_id"], :name => "index_lists_on_board_id"

  create_table "sessions", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "username"
    t.string   "password_digest"
    t.string   "name"
    t.string   "session_token"
  end

end
