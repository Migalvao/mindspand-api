class ChangeDefaultDescription < ActiveRecord::Migration[6.1]
  def change
    change_column_default :users, :description, from: nil, to: ""
  end
end
