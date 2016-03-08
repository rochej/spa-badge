class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.references :badge
      t.boolean :up

      t.timestamps null: false
    end
  end
end
