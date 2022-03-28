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
        default:
            return state
    }
}