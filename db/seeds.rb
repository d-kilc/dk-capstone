puts 'Generating data...'

User.create email: 'dan@example.com', password: 'test', password_confirmation: 'test', name: 'Dan'
User.create email: 'jill@example.com', password: 'test', password_confirmation: 'test', name: 'Jill'
User.create email: 'bill@example.com', password: 'test', password_confirmation: 'test', name: 'Bill'
User.create email: 'bob@example.com', password: 'test', password_confirmation: 'test', name: 'Bob'

User.create email: 'zach@example.com', password: 'test', password_confirmation: 'test', name: 'Zach'
User.create email: 'melissa@example.com', password: 'test', password_confirmation: 'test', name: 'Melissa'
User.create email: 'tarik@example.com', password: 'test', password_confirmation: 'test', name: 'Tarik'
User.create email: 'sandra@example.com', password: 'test', password_confirmation: 'test', name: 'Sandra'

Trip.create name: 'Vacation Summer 2k22'
Segment.create from: 'Chicago, IL, USA', to: 'New York, NY, USA', when: '2022-06-01', trip_id: 1, trip_sequence: 1
Segment.create from: 'New York, NY, USA', to: 'Philadelphia, PA, USA', when: '2022-06-03', trip_id: 1, trip_sequence: 2
Segment.create from: 'Philadelphia, PA, USA', to: 'Chicago, IL, USA', when: '2022-06-04', trip_id: 1, trip_sequence: 3
UserTrip.create user_id: 1, trip_id: 1, role: 'creator'
UserTrip.create user_id: 2, trip_id: 1, role: 'collaborator'
UserTrip.create user_id: 3, trip_id: 1, role: 'collaborator'
UserTrip.create user_id: 4, trip_id: 1, role: 'collaborator'

Trip.create name: 'Spring trip'
Segment.create from: 'Chicago, IL, USA', to: 'Miami, FL, USA', when: '2022-04-10', trip_id: 2, trip_sequence: 1
Segment.create from: 'Miami, FL, USA', to: 'Chicago, IL, USA', when: '2022-04-19', trip_id: 2, trip_sequence: 2
UserTrip.create user_id: 1, trip_id: 2, role: 'creator'
UserTrip.create user_id: 5, trip_id: 2, role: 'collaborator'
UserTrip.create user_id: 6, trip_id: 2, role: 'collaborator'
UserTrip.create user_id: 7, trip_id: 2, role: 'collaborator'
UserTrip.create user_id: 8, trip_id: 2, role: 'collaborator'

Group.create name: 'best friends'
UserGroup.create user_id: 1, group_id: 1, role: 'collaborator'
UserGroup.create user_id: 2, group_id: 1, role: 'collaborator'
UserGroup.create user_id: 3, group_id: 1, role: 'creator'
UserGroup.create user_id: 4, group_id: 1, role: 'collaborator'

Group.create name: 'the usual suspects'
UserGroup.create user_id: 1, group_id: 2, role: 'collaborator'
UserGroup.create user_id: 4, group_id: 2, role: 'collaborator'
UserGroup.create user_id: 8, group_id: 2, role: 'creator'

Event.create name: 'test', description: 'a test description', start: '2022-04-01T00:00:00', end: '2022-04-01T01:00:00', user_id: 1, trip_id: 1

puts 'Done.'