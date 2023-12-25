RSpec.describe "Auth", type: :request do
  describe 'register' do
    it 'with valid data' do
      user = attributes_for(:user)
      post '/auth/register', params: { user: user }

      expect(response).to have_http_status(:success)
      body = JSON.parse(response.body)['user']
      expect(body['id']).to be_an_instance_of(Integer)
      expect(body['email']).to eq(user[:email])
      expect(body['first_name']).to eq(user[:first_name])
      expect(body['last_name']).to eq(user[:last_name])
      expect(body['role']).to eq('user')
    end

    it 'with invalid data' do
      post '/auth/register', params: { user: attributes_for(:user, :invalid) }

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe 'login' do
    it 'with valid data' do
      user = create(:user, password: '123123')
      post '/auth/login', params: { user: { email: user[:email], password: '123123' } }

      expect(response).to have_http_status(:success)
      body = JSON.parse(response.body)['user']
      expect(body['id']).to be_an_instance_of(Integer)
      expect(body['email']).to eq(user[:email])
      expect(body['first_name']).to eq(user[:first_name])
      expect(body['last_name']).to eq(user[:last_name])
      expect(body['role']).to eq('user')
    end

    it 'with invalid data' do
      post '/auth/login', params: { user: {email: '123123123', password: '123123'} }

      expect(response).to have_http_status(:unauthorized)
    end
  end
end