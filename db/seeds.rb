# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({ username: 'whitesmith', password: 'password', email: 'email@email.com', name: 'Whitesmith' })

c = Category.create({ name: 'Home & Lifestyle', color: '2ECC71' })
Skill.create({ name: 'Dog Training', category: c })
Skill.create({ name: 'Gardening', category: c })
Skill.create({ name: 'Home Cooking', category: c })
Skill.create({ name: 'Interior Design', category: c })
Skill.create({ name: 'Wine Appreciation', category: c })

c = Category.create({ name: 'Writing', color: '95A5A6' })
Skill.create({ name: 'Creative Writing', category: c })
Skill.create({ name: 'Dramatic Writing', category: c })
Skill.create({ name: 'Fantasy and Science Fiction Writing', category: c })
Skill.create({ name: 'Imagination', category: c })
Skill.create({ name: 'Memory', category: c })
Skill.create({ name: 'Screenwriting', category: c })
Skill.create({ name: 'Songwriting', category: c })
Skill.create({ name: 'Storytelling', category: c })
Skill.create({ name: 'Writing', category: c })
Skill.create({ name: 'Writing for Social Change', category: c })
Skill.create({ name: 'Writing for Television', category: c })
Skill.create({ name: 'Writing for Young Audiences', category: c })
Skill.create({ name: 'Writing Poetry', category: c })
Skill.create({ name: 'Writing Thrillers', category: c })

c = Category.create({ name: 'Business', color: '9B59B6' })
Skill.create({ name: 'Advertising', category: c })
Skill.create({ name: 'Art of Negotiation', category: c })
Skill.create({ name: 'Building a Fashion Brand', category: c })
Skill.create({ name: 'Business Strategy', category: c })
Skill.create({ name: 'Campaign Strategy', category: c })
Skill.create({ name: 'Communication', category: c })
Skill.create({ name: 'Economics', category: c })
Skill.create({ name: 'Entrepreneurship', category: c })
Skill.create({ name: 'Leadership', category: c })
Skill.create({ name: 'Persuasion', category: c })
Skill.create({ name: 'Real Estate', category: c })
Skill.create({ name: 'Sales', category: c })

c = Category.create({ name: 'Food', color: '2980B9' })
Skill.create({ name: 'Cooking', category: c })
Skill.create({ name: 'Cooking Techniques', category: c })
Skill.create({ name: 'French Cooking', category: c })
Skill.create({ name: 'Home Cooking', category: c })
Skill.create({ name: 'Mexican Cooking', category: c })
Skill.create({ name: 'Mixology', category: c })
Skill.create({ name: 'Modern Italian Cooking', category: c })
Skill.create({ name: 'Modern Japanese Cooking', category: c })
Skill.create({ name: 'Sauces', category: c })
Skill.create({ name: 'Wine Appreciation', category: c })

c = Category.create({ name: 'Music', color: 'F1C40F' })
Skill.create({ name: 'Beatmaking', category: c })
Skill.create({ name: 'Creativity', category: c })
Skill.create({ name: 'Dance Music', category: c })
Skill.create({ name: 'Electric Guitar', category: c })
Skill.create({ name: 'Electronic music Production', category: c })
Skill.create({ name: 'Jazz', category: c })
Skill.create({ name: 'Music for Film', category: c })
Skill.create({ name: 'Percussion', category: c })
Skill.create({ name: 'Piano', category: c })
Skill.create({ name: 'Producing', category: c })
Skill.create({ name: 'Singing', category: c })
Skill.create({ name: 'Songwriting', category: c })
Skill.create({ name: 'Ukulele', category: c })
Skill.create({ name: 'Violin', category: c })

c = Category.create({ name: 'Design & Style', color: 'E67E22' })
Skill.create({ name: 'Architecture', category: c })
Skill.create({ name: 'Authenticity', category: c })
Skill.create({ name: 'Creativity', category: c })
Skill.create({ name: 'Design', category: c })
Skill.create({ name: 'Fashion Design', category: c })
Skill.create({ name: 'Game Design', category: c })
Skill.create({ name: 'Graphic Design', category: c })
Skill.create({ name: 'Interior Design', category: c })
Skill.create({ name: 'Photography', category: c })
Skill.create({ name: 'Self-Expression', category: c })
Skill.create({ name: 'Style', category: c })

c = Category.create({ name: 'Sports & Gaming', color: 'E84118' })
Skill.create({ name: 'Athlete’s Mindset', category: c })
Skill.create({ name: 'Ballet', category: c })
Skill.create({ name: 'Basketball', category: c })
Skill.create({ name: 'Chess', category: c })
Skill.create({ name: 'Gymnastics', category: c })
Skill.create({ name: 'Poker', category: c })
Skill.create({ name: 'Skateboarding', category: c })
Skill.create({ name: 'Tenis', category: c })

c = Category.create({ name: 'Wellness', color: '16A085' })
Skill.create({ name: 'Authenticity', category: c })
Skill.create({ name: 'Communication', category: c })
Skill.create({ name: 'Meditation', category: c })
Skill.create({ name: 'Mental Strength', category: c })
Skill.create({ name: 'Science of Better Sleep', category: c })
Skill.create({ name: 'Self-Expression', category: c })
Skill.create({ name: 'Sex', category: c })
Skill.create({ name: 'Wilderness Survival', category: c })
Skill.create({ name: 'Yoga', category: c })

c = Category.create({ name: 'Science & Tech', color: '3498DB' })
Skill.create({ name: 'Animal Intelligence', category: c })
Skill.create({ name: 'Climate Change', category: c })
Skill.create({ name: 'Industrial Agriculture', category: c })
Skill.create({ name: 'Scientific Thinking', category: c })
Skill.create({ name: 'Space Exploration', category: c })

# Colors
# Business            -       9B59B6
# Design & Style      -       E67E22
# Food                -       2980B9
# Home & LifeStyle    -       2ECC71
# Music               -       F1C40F
# Science & Tech      -       3498DB
# Sport & Gaming      -       E84118
# Wellness            -       16A085
# Writing             -       95A5A6

# SkillClass.create({title: "Example Class", description: "Amazing class", location: "Coimbra", no_classes:5, class_duration: 2, method: "synchronous", difficulty: "beginner", regime: "physical", teacher_id: 2, skill_id: 1})
