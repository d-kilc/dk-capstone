export default function groupReducer(state = { currentGroup: null, isGroupCreator: null }, action) {
    const { type, payload } = action
    console.log(type,payload)
    switch (type) {
        case 'SET_GROUP':

            return {
                ...state,
                currentGroup: payload.currentGroup,
                // isGroupCreator: idxOfCreator === idxOfUser
            }
        // case 'USER_IS_GROUP_CREATOR':
        //     return {
        //         ...state,
        //         isGroupCreator: payload
        //     }
        default:
            return state
    }
}