require 'rails_helper'

RSpec.describe User, type: :model do
  it 'validates first_name' do
    should validate_presence_of :first_name
    should validate_length_of(:first_name).is_at_least(2).is_at_most(50)
  end

  it 'validates last_name' do
    should validate_presence_of :last_name
    should validate_length_of(:last_name).is_at_least(2).is_at_most(50)
  end

  it "have many orders_description" do
    should have_many(:orders).dependent :nullify
  end
  it 'defines enum role' do
    should define_enum_for(:role).with_values(user: 0, admin: 1)
  end

  it 'validate uniqueness of email' do
    should validate_uniqueness_of(:email).case_insensitive
  end
end