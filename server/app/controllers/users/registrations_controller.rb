class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionsFix
  respond_to :json

  private

  def respond_with(current_user, _opts = {})
    if resource.persisted?
      render json: {
        user: UserSerializer.new(current_user).serializable_hash[:data][:attributes],
      }, status: :created
    else
      render json: { errors: current_user.errors.details }, status: :unprocessable_entity
    end
  end
end