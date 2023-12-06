class OrdersChangeAmountType < ActiveRecord::Migration[7.1]
  def change
    change_column :orders, :amount, :float, null: false
  end
end
