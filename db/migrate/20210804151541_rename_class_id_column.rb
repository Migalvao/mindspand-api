class RenameClassIdColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :match_requests, :class_id, :skill_class_id
  end
end
