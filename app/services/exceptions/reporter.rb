# Abstract which error reporting service is used
module Exceptions
  module Reporter
    # FIXME: install Sentry gem and add it to WS account so we can track errros
    def self.error(exception)
      # Sentry.capture_exception(exception, level: :error)
    end

    def self.warning(message)
      # Sentry.capture_message(message, level: :warning)
    end
  end
end
