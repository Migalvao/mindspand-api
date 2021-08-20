RSpec.configure do |config|
    config.after(:suite) do
        DatabaseCleaner.clean_with :truncation, except: %w(ar_internal_metadata)
    end
end