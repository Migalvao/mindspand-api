class AddDeletedFieldToSkillClass < ActiveRecord::Migration[6.1]
  def change
    add_column :skill_classes, :deleted, :boolean, default: false
  end
end
