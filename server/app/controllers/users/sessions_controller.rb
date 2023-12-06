class Users::SessionsController < Devise::SessionsController
  include RackSessionsFix
  respond_to :json

  private

  def respond_with(current_user, _opts = {})
    render json: { user: UserSerializer.new(current_user).serializable_hash[:data][:attributes] }, status: :ok
  end

  def respond_to_on_destroy
    begin
      if request.headers['Authorization'].present?
        jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.fetch(:secret_key_base)).first
        current_user = User.find(jwt_payload['sub'])
      end

      if current_user
        render json: {
          message: 'Logged out successfully.'
        }, status: :ok
      else
        render json: {
          message: "Couldn't find an active session."
        }, status: :unauthorized
      end
    rescue JWT::ExpiredSignature
      render json: {
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end