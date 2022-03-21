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
        default:
            return state
    }
}