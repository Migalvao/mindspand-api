class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.datetime :datetime
      t.text :text
      t.boolean :read, default: false
      t.integer :type
      t.references :person, null: false, foreign_key: { to_table: :users }
      t.references :match, null: false, foreign_key: { to_table: :match_requests }

      t.timestamps
    end
  end
end
