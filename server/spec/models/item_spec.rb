require 'rails_helper'

RSpec.describe Item, type: :model do
  it 'validates name' do
    should validate_presence_of :name
    should validate_length_of(:name).is_at_least 3
  end

  it 'validates description' do
    should validate_presence_of :description
    should validate_length_of(:description).is_at_least 10
  end

  it 'validates price' do
    should validate_presence_of :price
    should validate_numericality_of(:price).is_greater_than 0
  end

  it 'have one attached img' do
    should have_one_attached(:img)
  end

  it "have many orders_description" do
    should have_many(:orders_descriptions).dependent :destroy
  end
end