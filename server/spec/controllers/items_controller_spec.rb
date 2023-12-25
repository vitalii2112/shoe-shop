require 'rails_helper'

RSpec.describe ItemsController, type: :controller do
  describe "GET /items" do
    it "get all" do
      create_list(:item, 5)
      get :index

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to_not be_empty
      expect(JSON.parse(response.body).length).to eq 5
    end

    it 'get with search' do
      create(:item, name: 'Search name 1', description: 'Search description 1')
      create(:item, name: 'Search name 2', description: 'Search description 2')
      create(:item, name: 'name 3', description: 'description 3')

      get :index, params: { search: "search" }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to_not be_empty
      expect(JSON.parse(response.body).length).to eq 2
    end
  end

  describe 'GET /items/:id' do
    it 'get by id' do
      items = create_list(:item, 5)
      get :show, params: { id: items[3].id }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to_not be_empty
      expect(JSON.parse(response.body)['name']).to eq items[3].name
    end
    it 'get by non-existent id' do
      expect {
        get :show, params: { id: '1233' }
      }.to raise_error ActiveRecord::RecordNotFound
      expect(response).to have_http_status(:success)
      expect(response.body).to be_empty
    end
  end

  describe 'POST /items' do
    it 'create valid item' do
      user = create(:user, :admin)
      item_attributes = attributes_for(:item)
      sign_in user
      post :create, params: {item: item_attributes}
      expect(response).to have_http_status(:created)

      body = JSON.parse(response.body)
      expect(body['name']).to eq(item_attributes[:name])
      expect(body['description']).to eq(item_attributes[:description])
      expect(body['price']).to eq(item_attributes[:price])
      expect(body['img']).to be_an_instance_of(String)
      expect(body['id']).to be_an_instance_of(Integer)
    end

    it 'get error on create invalid item' do
      user = create(:user, :admin)
      sign_in user
      post :create, params: {item: attributes_for(:item, :invalid)}
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'check for admin access' do
      user = create(:user)
      sign_in user
      post :create
      expect(response).to have_http_status(:forbidden)
    end

    it 'when user is not authenticated' do
      post :create, params: { id: '1233' }
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'PATCH /items/:id' do
    it 'update by non-existent id' do
      user = create(:user, :admin)
      sign_in user
      expect {
        patch :update, params: { id: '1233' }
      }.to raise_error(ActiveRecord::RecordNotFound)
      expect(response).to have_http_status(:success)
      expect(response.body).to be_empty
    end

    it 'update valid item' do
      user = create(:user, :admin)
      item = create(:item)
      item_attributes = attributes_for(:item)
      sign_in user
      patch :update, params: {id: item.id, item: item_attributes}
      expect(response).to have_http_status(:success)

      body = JSON.parse(response.body)
      expect(body['name']).to eq(item_attributes[:name])
      expect(body['description']).to eq(item_attributes[:description])
      expect(body['price']).to eq(item_attributes[:price])
      expect(body['img']).to be_an_instance_of(String)
      expect(body['id']).to eq(item.id)
    end

    it 'get error on update invalid item' do
      item = create(:item)
      user = create(:user, :admin)
      sign_in user
      patch :update, params: {id: item.id, item: attributes_for(:item, :invalid)}
      expect(response).to have_http_status(:unprocessable_entity)
    end
    #
    it 'check for admin access' do
      user = create(:user)
      sign_in user
      patch :update, params: { id: '1233' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'when user is not authenticated' do
      patch :update, params: { id: '1233' }
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'DELETE /items/:id' do
    it 'delete by non-existent id' do
      user = create(:user, :admin)
      sign_in user
      expect {
        delete :destroy, params: { id: '1233' }
      }.to raise_error(ActiveRecord::RecordNotFound)
      expect(response).to have_http_status(:success)
      expect(response.body).to be_empty
    end

    it 'delete successful' do
      user = create(:user, :admin)
      item = create(:item)
      sign_in user
      delete :destroy, params: {id: item.id}
      expect(response).to have_http_status(:success)
    end

    it 'check for admin access' do
      user = create(:user)
      sign_in user
      delete :destroy, params: { id: '1233' }
      expect(response).to have_http_status(:forbidden)
    end

    it 'when user is not authenticated' do
      delete :destroy, params: { id: '1233' }
      expect(response).to have_http_status(:unauthorized)
    end
  end
end