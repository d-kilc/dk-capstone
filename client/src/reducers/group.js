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
        case 'SAVE_UPDATED_GROUP':
            return {
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    name: payload.name
                }
            }
        case 'UPDATE_GROUP_USERS':
            return {
                ...state,
                currentGroup: {
                    ...state.currentGroup,
                    user_groups: [...state.currentGroup.user_groups, {
                        id: payload.id,
                        role: 'collaborator',
                        user: {...payload.user}
                    }]
                }
            }
        default:
            return state
    }
}