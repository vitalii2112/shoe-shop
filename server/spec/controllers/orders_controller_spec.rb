require 'rails_helper'

RSpec.describe OrdersController, type: :controller do
  let(:user) { create(:user) }
  let(:admin) { create(:user, :admin) }

  before(:each) do |test|
    if test.metadata[:admin_required]
      sign_in admin unless test.metadata[:logout]
    else
      sign_in user unless test.metadata[:logout]
    end
  end

  describe 'user is not authenticated', :logout do
    it 'create order' do
      post :create
      expect(response).to have_http_status(:unauthorized)
    end
    it 'get order' do
      get :show, params: { id: 123123 }
      expect(response).to have_http_status(:unauthorized)
    end
    it 'get all orders' do
      get :index
      expect(response).to have_http_status(:unauthorized)
    end
    it 'get user orders' do
      get :user_orders, params: { user_id: 123123 }
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'user without admin role' do
    it 'get order' do
      get :show, params: { id: 123123 }
      expect(response).to have_http_status(:forbidden)
    end
    it 'get all orders' do
      get :index
      expect(response).to have_http_status(:forbidden)
    end
  end

  describe 'POST /orders', :admin_required do
    describe 'with invalid data' do
      it 'array of orders is not provided' do
        post :create, params: { order: { id: 1, quantity: 2 } }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['error']).to eq('Ожидался массив заказов')
      end
      it 'invalid order params' do
        order_params = [
          { id: 1, quantity: nil }
        ]

        post :create, params: { order: order_params }

        expect(response).to have_http_status(:unprocessable_entity)
        body = JSON.parse(response.body)
        expect(body['error']).to eq('Неверные параметры заказа')
      end
    end

    it 'with valid data' do
      item = create(:item)
      order_params = [
        { id: item.id, quantity: 3 }
      ]
      post :create, params: { order: order_params }

      expect(response).to have_http_status(:created)
      body = JSON.parse(response.body)
      expect(body['message']).to eq('Order created')
      expect(body['order_id']).to be_an_instance_of(Integer)
    end
  end

  describe 'GET /orders/:id', :admin_required do
    it 'get orders by non-existent id' do
      expect {
        get :show, params: { id: 123123 }
      }.to raise_error(ActiveRecord::RecordNotFound)

      expect(response).to have_http_status(:success)
      expect(response.body).to be_empty
    end

    it 'with valid data' do
      order = create(:order)
      get :show, params: { id: order.id }

      expect(response).to have_http_status(:success)
      body = JSON.parse(response.body)
      expect(body).to_not be_empty
      expect(body['id']).to eq order[:id]
      expect(body['amount']).to eq order[:amount]
    end
  end

  it 'GET /orders', :admin_required do
    create_list(:order, 5, user_id: user.id)
    create_list(:order, 5)
    get :index

    expect(response).to have_http_status(:success)
    body = JSON.parse(response.body)
    expect(body.length).to eq 10
  end

  describe 'GET /orders/user/:user_id' do
    it 'get user orders by non-existent id' do
      get :user_orders, params: { user_id: 123123 }

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).length).to eq 0
    end

    it 'get user orders' do
      create_list(:order, 5, user_id: user.id)
      create_list(:order, 5)
      get :user_orders, params: {user_id: user.id}

      expect(response).to have_http_status(:success)
      body = JSON.parse(response.body)
      expect(body.length).to eq 5
    end
  end
end