export default function tripReducer(state = { segments: [{from: '', to: '', when: '', tripSequence: 1}] }, action) {
    const { type, payload } = action
    switch (type) {
        case 'ADD_SEGMENT':
            return {
                ...state,
                segments: [...state.segments, {from: '', to: '', when: '', tripSequence: state.segments[state.segments.length - 1].tripSequence + 1}]
            }
        default:
            return state
    }
}