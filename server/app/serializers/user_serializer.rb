class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :role, :first_name, :last_name
end
