export default function authReducer(state = { user: null, loggedIn: false}, action) {
    const { type, payload } = action
    switch (type) {
        case 'LOG_IN':
            return {
                ...state,
                user: payload,
                loggedIn: true
            }
        case 'LOG_OUT':
            return {
                ...state,
                user: null,
                loggedIn: false
            }
        case 'SIGN_UP':
            return {
                ...state,
                user: payload,
                loggedIn: true,
            }
        case 'REFRESH':
            return {
                ...state,
                ...payload
            }
        case 'ADD_NEW_TRIP':
            return {
                ...state,
                user: {
                    ...state.user,
                    user_trips: [
                        ...state.user.user_trips,
                        {...payload}
                    ]
                }
            }
        case 'DELETE_TRIP':
            // payload.id
            const deleteIdx = state.user.user_trips.findIndex(userTrip => {
                return userTrip.trip.id === payload.id
            })
            console.log(deleteIdx)
            const userTripsCopy = [...state.user.user_trips]
            userTripsCopy.splice(deleteIdx, 1)
            return {
                ...state,
                user: {
                    ...state.user,
                    user_trips: [...userTripsCopy],
                }
            }
        case 'UPDATE_TRIPS':
            const updateIdx = state.user.user_trips.findIndex(userTrip => {
                return userTrip.trip.id === payload.id
            })
            const copy = [...state.user.user_trips]
            copy[updateIdx].trip.name = payload.name
            return {
                ...state,
                user: {
                    ...state.user,
                    user_trips: [ ...copy ]
                }
            }
        case 'LEAVE_TRIP':
            const tripIdx = state.user.user_trips.findIndex(userTrip => userTrip.id === payload.id)
            const newUserTrips = [...state.user.user_trips]
            newUserTrips.splice(tripIdx, 1)
            return {
                ...state,
                user: {
                    ...state.user,
                    user_trips: [...newUserTrips]
                }
            }
        case 'NEW_GROUP':
            return {
                ...state,
                user: {
                    ...state.user,
                    user_groups: [...state.user.user_groups, payload]
                }
            }
        case 'LEAVE_GROUP':
            const groupIdx = state.user.user_groups.findIndex(userGroup => userGroup.id === payload.id)
            const newUserGroups = [...state.user.user_groups]
            newUserGroups.splice(groupIdx, 1)
            return {
                ...state,
                user: {
                    ...state.user,
                    user_groups: [...newUserGroups]
                }
            }
        case 'DELETE_GROUP':
            // payload.id
            const deleteGroupIdx = state.user.user_groups.findIndex(userGroup => {
                return userGroup.group.id === payload.id
            })
            const userGroupsCopy = [...state.user.user_groups]
            userGroupsCopy.splice(deleteGroupIdx, 1)
            return {
                ...state,
                user: {
                    ...state.user,
                    user_groups: [...userGroupsCopy],
                }
            }
        case 'UPDATE_GROUPS':
            const updateGroupIdx = state.user.user_groups.findIndex(userGroup => {
                return userGroup.group.id === payload.id
            })
            const groupCopy = [...state.user.user_groups]
            groupCopy[updateGroupIdx].group.name = payload.name
            return {
                ...state,
                user: {
                    ...state.user,
                    user_groups: [ ...groupCopy ]
                }
            }
        default:
            return state
    }
}