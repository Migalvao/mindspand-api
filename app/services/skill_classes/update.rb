module SkillClasses
  class Update < BaseService
    def initialize(skil_class_params:)
      super

      @skil_class_params = skil_class_params
    end

    def call
      # Find Skill with given:
      # - params1
      # - params2
      skill_class = find_skill_class

      SkillClass.transaction do
        if skill_class.present?
          # If the SkillClass already exists (for a example, a Checkout that wasn't complete),
          # we use it, and ensure it is updated
          update_skill_class(skill_class)
        end

        if skill_class.persisted? && skill_class.valid?
          success(payload: skill_class)
        else
          error(payload: skill_class.errors.messages, message: error_message)
        end
      end
    rescue StandardError => e
      Exceptions::Reporter.error(e)
      error(payload: { error: error_message }, message: error_message)
    end

    private

    attr_reader :skil_class_params

    def find_skill_class
      SkillClass.find_by(
        # some params
      )
    end

    def update_skill_class
      # update skill logic
    end
  end
end
