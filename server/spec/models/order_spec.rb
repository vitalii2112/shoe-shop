require 'rails_helper'

RSpec.describe Order, type: :model do
  it 'validates amount' do
    should validate_presence_of :amount
    should validate_numericality_of(:amount).is_greater_than 0
  end

  it "have many orders_description" do
    should have_many(:orders_descriptions).dependent(:destroy)
  end

  it 'belongs to user' do
    should belong_to(:user)
  end
end