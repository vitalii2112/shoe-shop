class CreateOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :orders do |t|
      t.integer :amount, null: false
      t.references :user, null: false, foreign_key: true
    end
  end
end
