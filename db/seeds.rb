puts 'Generating data...'

User.create email: 'dan@example.com', password: 'test', password_confirmation: 'test', name: 'Dan'
User.create email: 'jill@example.com', password: 'test', password_confirmation: 'test', name: 'Jill'
User.create email: 'bill@example.com', password: 'test', password_confirmation: 'test', name: 'Bill'
User.create email: 'bob@example.com', password: 'test', password_confirmation: 'test', name: 'Bob'

Trip.create name: 'Vacation Summer 2k22'

Segment.create from: 'Chicago', to: 'New York', when: '06/01/2022', trip_id: 1, trip_sequence: 1
Segment.create from: 'New York', to: 'Philadelphia', when: '06/03/2022', trip_id: 1, trip_sequence: 2
Segment.create from: 'Philadelphia', to: 'Chicago', when: '06/04/2022', trip_id: 1, trip_sequence: 3

UserTrip.create user_id: 1, trip_id: 1, role: 'creator'
UserTrip.create user_id: 2, trip_id: 1, role: 'collaborator'
UserTrip.create user_id: 3, trip_id: 1, role: 'collaborator'
UserTrip.create user_id: 4, trip_id: 1, role: 'collaborator'

Group.create name: 'best frands'

UserGroup.create user_id: 1, group_id: 1
UserGroup.create user_id: 2, group_id: 1
UserGroup.create user_id: 3, group_id: 1
UserGroup.create user_id: 4, group_id: 1

puts 'Done.'