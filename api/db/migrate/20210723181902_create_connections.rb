class CreateConnections < ActiveRecord::Migration[6.1]
  def change
    create_table :connections do |t|
      t.datetime :ended_at
      t.integer :class_status, default: 0
      t.integer :person_closed_connection, default: 0
      t.references :match, null: false, foreign_key: { to_table: :match_requests }

      t.timestamps
    end
  end
end
