class RenameDificultyColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :skill_classes, :dificulty, :difficulty
  end
end
