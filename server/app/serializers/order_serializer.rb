class OrderSerializer
  include JSONAPI::Serializer
  attributes :id, :amount, :user_id, :items

  attribute :amount do |object|
    object.amount.to_f
  end

  attribute :items do |object|
    object.descriptions
  end
end
