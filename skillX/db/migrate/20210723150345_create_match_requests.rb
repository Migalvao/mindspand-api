class CreateMatchRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :match_requests do |t|
      # t.datetime :creation_datetime
      t.datetime :response_datetime
      t.integer :status
      t.references :student, null: false, foreign_key: { to_table: :users }
      t.references :class, null: false, foreign_key: { to_table: :skill_classes }

      t.timestamps
    end
  end
end
