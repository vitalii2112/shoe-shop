class ItemsController < ApplicationController
  include AdminCheck
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :require_admin, only: [:create, :update, :destroy]
  before_action :set_item, only: [:update, :destroy]

  # GET /items
  def index
    search_term = params[:search]
    @items = search_term.present? ? Item.where("name ILIKE ? OR description ILIKE ?", "%#{search_term}%", "%#{search_term}%") : Item.all
    render json: @items.order(id: :desc).map { |item| get_item(item) }
  end

  # POST /items
  def create
    @item = Item.new(item_params)

    if @item.save
      render json: get_item(@item), status: :created
    else
      render json: @item.errors.details, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /items/1
  def update
    if @item.update(item_params)
      render json: get_item(@item)
    else
      render json: @item.errors.details, status: :unprocessable_entity
    end
  end

  # DELETE /items/1
  def destroy
    @item.destroy!
  end

  private

  def set_item
    @item = Item.find(params[:id])
  end

  def get_item(item)
    ItemSerializer.new(item).serializable_hash[:data][:attributes]
  end

  def item_params
    params.require(:item).permit(:name, :description, :price, :img)
  end
end
