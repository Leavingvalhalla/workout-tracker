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

ActiveRecord::Schema[7.0].define(version: 2022_09_12_195552) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "lifts", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "maxes", force: :cascade do |t|
    t.integer "lift_id"
    t.integer "user_id"
    t.integer "max"
    t.integer "goal"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "routine_lifts", force: :cascade do |t|
    t.integer "routine_id"
    t.float "weight"
    t.integer "reps"
    t.integer "lift_id"
    t.integer "position"
    t.integer "index"
    t.boolean "amrap"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "routines", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_lifts", force: :cascade do |t|
    t.integer "lift_id"
    t.integer "workout_id"
    t.integer "weight"
    t.integer "reps"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.integer "routine_id"
    t.integer "routine_position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "workouts", force: :cascade do |t|
    t.integer "user_id"
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
