class UsersController < ApplicationController
  include AdminCheck

  before_action :authenticate_user!
  before_action :require_admin, except: [:index, :update_me]
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /accounts/me
  def index
    render json: {user: get_user(current_user)}
  end

  # PATCH /accounts/me
  def update_me
    if current_user.update(params.require(:user).permit(:first_name, :last_name, :email))
      render json: get_user(current_user)
    else
      render json: current_user.errors, status: :unprocessable_entity
    end
  end

  # GET /accounts/1
  def show
    render json: get_user(@user)
  end

  # GET /accounts
  def show_all
    @users = User.all.order(id: :desc).map { |user| get_user(user) }
    render json: @users
  end

  # PATCH /accounts/1
  def update
    if @user.update(params.require(:user).permit(:first_name, :last_name, :email, :role))
      render json: get_user(@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /accounts/1
  def destroy
    @user.destroy!
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def get_user(user)
    UserSerializer.new(user).serializable_hash[:data][:attributes]
  end
end
