class OrdersController < ApplicationController
  include AdminCheck
  before_action :authenticate_user!
  before_action :require_admin, only: [:index, :show]

  # GET /orders/user/1
  def user_orders
    @orders = Order.where(user_id: params[:user_id]).order(id: :desc).map { |order| get_order(order) }
    render json: @orders
  end

  # GET /orders
  def index
    @orders = Order.all.order(id: :desc).map { |order| get_order(order) }
    render json: @orders
  end

  # GET /orders/1
  def show
    @order = Order.find(params[:id])
    render json: get_order(@order)
  end

  # POST /orders
  def create
    if order_params.is_a?(Array)
      order_params.each do |param|
        param.permit(:id, :quantity)
        unless param[:id].present? && param[:quantity].present?
          render json: { error: 'Неверные параметры заказа' }, status: :unprocessable_entity
          return
        end
      end
    else
      render json: { error: 'Ожидался массив заказов' }, status: :unprocessable_entity
    end

    @items_data = order_params.map { |item| [item['id'], item['quantity']] }.to_h
    @items = Item.where(id: @items_data.keys)

    ActiveRecord::Base.transaction do
      @order = Order.new(user_id: current_user.id, amount: @items.sum { |item| item.price * @items_data[item.id] })
      if @order.save
        order_descriptions_data = @items.map { |item| { order_id: @order.id, item_id: item.id, quantity: @items_data[item.id] } }
        @order_descriptions = OrdersDescription.create!(order_descriptions_data)
        render json: { message: 'Order created', order_id: @order.id }, status: :created
      else
        render json: @order.errors.details, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end
    end
  end

  private

  def get_order(order)
    OrderSerializer.new(order).serializable_hash[:data][:attributes]
  end

  def order_params
    params.require(:order)
  end
end

