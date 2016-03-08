class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.references :peep
      t.string :text

      t.timestamps null: false
    end
  end
end
