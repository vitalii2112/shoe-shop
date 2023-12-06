class CreateOrdersDescriptions < ActiveRecord::Migration[7.1]
  def change
    create_table :orders_descriptions do |t|
      t.references :order, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
      t.integer :quantity, null: false
    end
  end
end
