class CreateItems < ActiveRecord::Migration[7.1]
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.float :price, null: false
    end
  end
end
