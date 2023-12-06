class OrdersChangeAmountColumn < ActiveRecord::Migration[7.1]
  def up
    change_column :orders, :amount, :decimal, precision: 10, scale: 2
  end

  def down
    change_column :orders, :amount, :float
  end
end
