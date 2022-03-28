export default function groupReducer(state = [], action) {
    const { type, payload } = action
    console.log(type,payload)
    switch (type) {
        case 'SET_USERS':
            return [...payload]

        default:
            return state
    }
}