// export default (state = {user: null}, action) => {
export default function authReducer(state = { user: null, loggedIn: false}, action) {
    const { type, payload } = action
    switch (type) {
        case 'LOG_IN':
            // console.log('logging in', type, payload)
            console.log('LOGGING IN', type, payload)
            return {
                ...state,
                user: payload,
                loggedIn: true
            }
        case 'LOG_OUT':
            console.log('LOGGING OUT', type, payload)
            return {
                ...state,
                user: null,
                loggedIn: false
            }
        case 'SIGN_UP':
            console.log('SIGNING UP', type, payload)
            return {
                ...state,
                user: payload,
                loggedIn: true,
            }
        case 'REFRESH':
            console.log('REFRESHING', type, payload)
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}