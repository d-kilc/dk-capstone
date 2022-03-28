import { combineReducers } from 'redux'

import auth from './auth'
import trip from './trip'
import group from './group'
import newTrip from './newTrip'
import users from './users'

export default combineReducers({
    auth,
    group,
    trip,
    newTrip,
    users,
})