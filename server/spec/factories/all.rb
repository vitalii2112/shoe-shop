FactoryBot.define do
  factory :item do
    name { Faker::Lorem.sentence(word_count: 2) }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
    price { Faker::Number.decimal(l_digits: 2) }

    img { Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'images', '1.svg'), 'image/svg+xlm') }
    trait :invalid do
      name { Faker::Lorem.characters(number: 2) }
      description { Faker::Lorem.paragraph(sentence_count: 2) }
      price { "2500.00" }
    end
  end

  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
    password { Faker::Internet.password(min_length: 6) }
    trait :admin do
      role { 1 }
    end
    trait :invalid do
      first_name { Faker::Lorem.characters(number: 2) }
      last_name { Faker::Lorem.characters(number: 2) }
      email { Faker::Lorem.characters(number: 2) }
    end
  end

  factory :orders_description do
    association :order
    association :item
    quantity { Faker::Number.between(from: 1, to: 10) }
  end

  factory :order do
    amount { Faker::Number.decimal(l_digits: 2) }
    association :user

    transient do
      items_count { 2 }
    end

    after(:create) do |order, evaluator|
      create_list(:orders_description, evaluator.items_count, order: order)
    end
  end
end