RSpec.describe UsersController, type: :controller do
  context 'when user is authenticated' do
    let(:user) { create(:user) }
    let(:admin) { create(:user, :admin) }
    before(:each) do
      sign_in user
    end
    describe "GET /user/auth/me" do
      it 'get me' do
        get :index
        expect(response).to have_http_status(:success)

        body = JSON.parse(response.body)['user']
        expect(body['first_name']).to eq(user[:first_name])
        expect(body['last_name']).to eq(user[:last_name])
        expect(body['email']).to eq(user[:email])
        expect(body['role']).to eq(user[:role])
      end

      it 'update me' do
        new_user_attributes = attributes_for(:user)
        patch :update_me, params: { user: new_user_attributes }
        expect(response).to have_http_status(:success)

        body = JSON.parse(response.body)
        expect(body['first_name']).to eq(new_user_attributes[:first_name])
        expect(body['last_name']).to eq(new_user_attributes[:last_name])
        expect(body['email']).to eq(new_user_attributes[:email])
        expect(body['role']).to eq(user[:role])
      end
    end

    describe 'GET /user/users' do
      it 'get all where user is not admin' do
        get :show_all
        expect(response).to have_http_status(:forbidden)
      end
      it 'get all' do
        sign_in admin
        create_list(:user, 10)
        get :show_all

        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body).length).to eq 12
      end
    end

    describe 'GET /user/users/:id' do
      it 'get user by id where user is not admin' do
        get :show, params: {id: 123}
        expect(response).to have_http_status(:forbidden)
      end

      it 'get user by non-existent id' do
        sign_in admin
        expect {
          get :show, params: {id: 123}
        }.to raise_error(ActiveRecord::RecordNotFound)

        expect(response).to have_http_status(:success)
        expect(response.body).to be_empty
      end

      it 'get user by id' do
        sign_in admin
        get :show, params: {id: user.id}

        expect(response).to have_http_status(:success)
        body = JSON.parse(response.body)
        expect(body['first_name']).to eq(user[:first_name])
        expect(body['last_name']).to eq(user[:last_name])
        expect(body['email']).to eq(user[:email])
        expect(body['role']).to eq(user[:role])
      end
    end

    describe 'PATCH /user/users/:id' do
      it 'update user by id where user is not admin' do
        patch :update, params: {id: 123}
        expect(response).to have_http_status(:forbidden)
      end

      it 'update user by non-existent id' do
        sign_in admin
        expect {
          patch :update, params: {id: 123}
        }.to raise_error(ActiveRecord::RecordNotFound)

        expect(response).to have_http_status(:success)
        expect(response.body).to be_empty
      end

      it 'update user with invalid data' do
        sign_in admin
        patch :update, params: {id: user.id, user: attributes_for(:user, :invalid)}

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'update user' do
        sign_in admin
        user_attributes = attributes_for(:user, role: 'admin')
        patch :update, params: {id: user.id, user: user_attributes}

        expect(response).to have_http_status(:success)
        body = JSON.parse(response.body)
        expect(body['first_name']).to eq(user_attributes[:first_name])
        expect(body['last_name']).to eq(user_attributes[:last_name])
        expect(body['email']).to eq(user_attributes[:email])
        expect(body['role']).to eq(user_attributes[:role])
        expect(body['id']).to eq(user[:id])
      end
    end

    describe 'DELETE /user/users/:id' do
      it 'delete user by id where user is not admin' do
        delete :destroy, params: {id: 123}
        expect(response).to have_http_status(:forbidden)
      end

      it 'delete user by non-existent id' do
        sign_in admin
        expect {
          delete :destroy, params: {id: 123}
        }.to raise_error(ActiveRecord::RecordNotFound)

        expect(response).to have_http_status(:success)
        expect(response.body).to be_empty
      end

      it 'delete user' do
        sign_in admin
        delete :destroy, params: {id: user.id}

        expect(response).to have_http_status(:success)
      end
    end
  end

  describe 'when user is not authenticated' do
    it 'get me' do
      get :index
      expect(response).to have_http_status(:unauthorized)
    end

    it 'update me' do
      patch :update_me
      expect(response).to have_http_status(:unauthorized)
    end

    it 'update user' do
      patch :update, params: { id: 123 }
      expect(response).to have_http_status(:unauthorized)
    end

    it 'delete user' do
      delete :destroy, params: { id: 123 }
      expect(response).to have_http_status(:unauthorized)
    end

    it 'get user' do
      get :show, params: { id: 123 }
      expect(response).to have_http_status(:unauthorized)
    end

    it 'get users' do
      get :show_all
      expect(response).to have_http_status(:unauthorized)
    end
  end
end