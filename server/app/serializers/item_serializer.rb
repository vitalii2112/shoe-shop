class ItemSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :description, :price

  attribute :img do |object|
    object.img_url
  end
end
