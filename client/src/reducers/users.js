export default function usersReducer(state = {allUsers: [], selectedUsers: []}, action) {
    const { type, payload } = action
    console.log(type,payload)
    switch (type) {
        case 'SET_USERS':
            return {
                ...state,
                allUsers: [...payload]
            }
        case 'SELECT_USERS':
            return {
                ...state,
                selectedUsers: [...payload.users]
            }
        default:
            return state
    }
}