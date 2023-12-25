require 'rails_helper'

RSpec.describe OrdersDescription, type: :model do
  it 'validates quantity' do
    should validate_presence_of :quantity
    should validate_numericality_of(:quantity).is_greater_than 0
  end

  it 'belongs to item' do
    should belong_to(:item)
  end

  it 'belongs to order' do
    should belong_to(:order)
  end
end