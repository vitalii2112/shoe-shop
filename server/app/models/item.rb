class Item < ApplicationRecord
  has_many :orders_descriptions, dependent: :destroy
  has_one_attached :img

  validates :name, presence: true, length: {minimum: 3}
  validates :description, presence: true, length: {minimum: 10}
  validates :price, presence: true, numericality: {greater_than: 0}

  def img_url
    Rails.application.routes.url_helpers.rails_blob_path(img) if img.attached?
  end
end
