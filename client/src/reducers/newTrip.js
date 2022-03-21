export default function tripReducer(state = { segments: [{from: '', to: '', when: '', tripSequence: 1}], modalVisible: false }, action) {
    const { type, payload } = action
    switch (type) {
        case 'ADD_SEGMENT':
            return {
                ...state,
                segments: [...state.segments, {from: '', to: '', when: '', tripSequence: state.segments[state.segments.length - 1].tripSequence + 1}]
            }
        case 'DELETE_SEGMENT':
            if (state.segments.length === 1) return { ...state }

            let segmentId = payload
            const segments = [...state.segments]
            const deleteIdx = segments.findIndex(segment => {
                return segment.tripSequence === segmentId
            })
            segments.splice(deleteIdx, 1)

            return {
                ...state,
                segments: segments
            }
        case 'UPDATE_SEGMENT':
            const segmentsCopy = [...state.segments]
            const updateIdx = segmentsCopy.findIndex(segment => {
                return segment.tripSequence === payload.segmentId
            })

            segmentsCopy[updateIdx] = {
                ...state.segments[updateIdx],
                [payload.key]: payload.value,
            }

            return {
                ...state,
                segments: segmentsCopy
            }
        case 'TOGGLE_SEGMENT_MODAL':
            return {
                ...state,
                modalVisible: !state.modalVisible
            }
        default:
            return state
    }
}