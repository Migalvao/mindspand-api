# This class will hold convenience methods for our services.
# For now, we're only providing a shorthand for running the services
# without explicitly needing to instantiate them.
class BaseService
  def self.call(**args)
    new(**args).call
  end

  def self.call!(**args)
    new(**args).call!
  end

  def initialize(_args); end

  def success(payload: nil)
    OpenStruct.new({ success?: true, payload: payload })
  end

  def error(payload: nil, message: nil)
    OpenStruct.new({ success?: false, payload: payload, message: message })
  end
end
