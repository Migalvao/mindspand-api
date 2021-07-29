class CreateSkillClasses < ActiveRecord::Migration[6.1]
  def change
    create_table :skill_classes do |t|
      t.string :title
      t.text :description
      t.integer :no_classes
      t.integer :class_duration
      t.integer :method
      t.integer :dificulty
      t.integer :regime
      t.string :location
      t.boolean :archived
      t.references :teacher, null: false, foreign_key: { to_table: :users }
      t.references :skill, null: false, foreign_key: { to_table: :skills }

      t.timestamps
    end
  end
end
