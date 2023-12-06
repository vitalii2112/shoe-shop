module AdminCheck
  def require_admin
    if current_user.role != 'admin'
      render json: { error: 'Permission denied' }, status: :forbidden
    end
  end
end
