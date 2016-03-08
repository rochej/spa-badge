# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Peep.delete_all
Badge.delete_all
Vote.delete_all

@peep = Peep.create(name: "Dave")
@peep.badges.create(text: "WAWGTN")
@peep.badges.first.votes.create(up: true)

@peep = Peep.create(name: "Roche")
@peep.badges.create(text: "Most likely to pirouette.")
@peep.badges.first.votes.create(up: true)
