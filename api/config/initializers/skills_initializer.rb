require 'json'

file = File.read(__dir__ + '/../skills.json')
SKILLS = JSON.parse(file)