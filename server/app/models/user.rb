class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  has_many :orders, dependent: :nullify

  devise :database_authenticatable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
  enum :role, [:user, :admin]
  validates :first_name, presence: true, length: {minimum: 2, maximum: 50}
  validates :last_name, presence: true, length: {minimum: 2, maximum: 50}
end
