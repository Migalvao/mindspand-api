class ChangeStuff < ActiveRecord::Migration[6.1]
  def change
    change_column_default :skill_classes, :archived, from:true, to: false

    
    change_column :match_requests, :status, :integer, default: 0
  end
end
