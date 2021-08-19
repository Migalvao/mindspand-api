class ApplicationService
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