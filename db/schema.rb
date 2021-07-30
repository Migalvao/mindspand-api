# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_30_111359) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "connections", force: :cascade do |t|
    t.datetime "ended_at"
    t.integer "class_status", default: 0
    t.integer "person_closed_connection", default: 0
    t.bigint "match_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["match_id"], name: "index_connections_on_match_id"
  end

  create_table "match_requests", force: :cascade do |t|
    t.datetime "response_datetime"
    t.integer "status", default: 0
    t.bigint "student_id", null: false
    t.bigint "class_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["class_id"], name: "index_match_requests_on_class_id"
    t.index ["student_id"], name: "index_match_requests_on_student_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.text "text"
    t.boolean "read", default: false
    t.integer "notification_type"
    t.bigint "person_id", null: false
    t.bigint "match_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["match_id"], name: "index_notifications_on_match_id"
    t.index ["person_id"], name: "index_notifications_on_person_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "rating"
    t.text "comment"
    t.boolean "student_teacher"
    t.bigint "connection_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["connection_id"], name: "index_reviews_on_connection_id"
  end

  create_table "skill_classes", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "no_classes"
    t.integer "class_duration"
    t.integer "method"
    t.integer "difficulty"
    t.integer "regime"
    t.string "location"
    t.boolean "archived", default: false
    t.bigint "teacher_id", null: false
    t.bigint "skill_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["skill_id"], name: "index_skill_classes_on_skill_id"
    t.index ["teacher_id"], name: "index_skill_classes_on_teacher_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.bigint "category_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_skills_on_category_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "email"
    t.text "description"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "connections", "match_requests", column: "match_id"
  add_foreign_key "match_requests", "skill_classes", column: "class_id"
  add_foreign_key "match_requests", "users", column: "student_id"
  add_foreign_key "notifications", "match_requests", column: "match_id"
  add_foreign_key "notifications", "users", column: "person_id"
  add_foreign_key "reviews", "connections"
  add_foreign_key "skill_classes", "skills"
  add_foreign_key "skill_classes", "users", column: "teacher_id"
end
