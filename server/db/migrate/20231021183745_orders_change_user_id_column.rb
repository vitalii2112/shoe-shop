class OrdersChangeUserIdColumn < ActiveRecord::Migration[7.1]
  def up
    change_column :orders, :user_id, :integer, null: true
  end
  def down
    change_column :orders, :user_id, :integer, null: false
  end
end
