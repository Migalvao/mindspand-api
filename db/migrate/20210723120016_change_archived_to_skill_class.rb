class ChangeArchivedToSkillClass < ActiveRecord::Migration[6.1]
  def change
    change_column_default :skill_classes, :archived, to: false
  end
end
