export default function tripReducer(state = { }, action) {
    const { type, payload } = action
    switch (type) {
        case 'SET_TRIP':
            // console.log('logging in', type, payload)
            console.log('SET_TRIP', type, payload)
            return {
                ...state,
                currentTrip: payload,
            }
        default:
            return state
    }
}