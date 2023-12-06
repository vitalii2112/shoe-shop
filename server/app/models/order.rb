class Order < ApplicationRecord
  belongs_to :user

  has_many :orders_descriptions, dependent: :destroy

  validates :amount, presence: true, numericality: { greater_than: 0 }

  def descriptions
    orders_descriptions.includes(:item).map { |desc| {
      name: desc.item.name,
      description: desc.item.description,
      price: desc.item.price,
      quantity: desc.quantity,
      img: desc.item.img_url
    } }
  end
end


