# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({username: "whitesmith", password: "password", email: "email@email.com", name: "Whitesmith"})

c = Category.create({name: "Home & Lifestyle"})
Skill.create({name: "Dog Training", category: c})
Skill.create({name: "Gardening", category: c})
Skill.create({name: "Home Cooking", category: c})
Skill.create({name: "Interior Design", category: c})
Skill.create({name: "Wine Appreciation", category: c})

c = Category.create({name: "Writing"})
Skill.create({name: "Creative Writing", category: c})
Skill.create({name: "Dramatic Writing", category: c})
Skill.create({name: "Fantasy and Science Fiction Writing", category: c})
Skill.create({name: "Imagination", category: c})
Skill.create({name: "Memory", category: c})
Skill.create({name: "Screenwriting", category: c})
Skill.create({name: "Songwriting", category: c})
Skill.create({name: "Storytelling", category: c})
Skill.create({name: "Writing", category: c})
Skill.create({name: "Writing for Social Change", category: c})
Skill.create({name: "Writing for Television", category: c})
Skill.create({name: "Writing for Young Audiences", category: c})
Skill.create({name: "Writing Poetry", category: c})
Skill.create({name: "Writing Thrillers", category: c})

=begin

Business
Advertising
Art of Negotiation
Building a Fashion Brand
Business Strategy
Campaign Strategy
Communication
Economics
Entrepreneurship
Leadership
Persuasion
Real Estate
Sales

Food
Cooking
Cooking Techniques
French Cooking
Home Cooking
Mexican Cooking
Mixology
Modern Italian Cooking
Modern Japanese Cooking
Sauces
Wine Appreciation

Music
Beatmaking
Creativity
Dance Music
Electric Guitar
Electronic music Production
Jazz
Music for Film
Percussion
Piano
Producing
Singing
Songwriting
Ukulele
Violin

Design & Style 
Architecture
Authenticity
Creativity
Design
Fashion Design
Game Design
Graphic Design
Interior Design
Photography
Self-Expression
Style

Sports & Gaming
Athlete’s Mindset
Ballet
Basketball
Chess
Gymnastics 
Mental Strength
Poker
Skateboarding
Tenis

Wellness
Authenticity
Communication
Meditation
Mental Strength
Science of Better Sleep
Self-Expression
Sex
Wilderness Survival
Yoga

Science & Tech
Animal Intelligence
Climate Change
Industrial Agriculture
Scientific Thinking
Space Exploration

=end

# SkillClass.create({title: "Example Class", description: "Amazing class", location: "Coimbra", no_classes:5, class_duration: 2, method: "synchronous", difficulty: "beginner", regime: "physical", teacher_id: 2, skill_id: 1})


