export default function tripReducer(state = {
    name: '',
    modalVisible: false,
    segments: [{
        from: '',
        to: '',
        when: '',
        how: '',
        tripSequence: 1,
        modalVisible: false,
        placeIds: []
    }],
}, action) {

    const { type, payload } = action

    const segmentsCopy = [...state.segments]

    switch (type) {
        case 'ADD_SEGMENT':
            return {
                ...state,
                segments: [...segmentsCopy, {from: '', to: '', when: '', how: '', tripSequence: state.segments[state.segments.length - 1].tripSequence + 1}]
            }
        case 'DELETE_SEGMENT':
            let deleteIdx = segmentsCopy.findIndex(segment => {
                return segment.tripSequence === payload.segmentId
            })

            if (state.segments.length === 1) return { ...state }
            segmentsCopy.splice(deleteIdx, 1)

            return {
                ...state,
                segments: segmentsCopy
            }
        case 'UPDATE_SEGMENT':
            const updateIdx = segmentsCopy.findIndex(segment => {
                return segment.tripSequence === payload.segmentId
            })

            segmentsCopy[updateIdx] = {
                ...payload.newSegment,
                tripSequence: payload.segmentId,
                modalVisible: false,
                placeIds: payload.placeIds
            }

            return {
                ...state,
                segments: segmentsCopy
            }
        case 'TOGGLE_SEGMENT_MODAL':
           const toggleIdx = segmentsCopy.findIndex(segment => {
                return segment.tripSequence === payload.segmentId
            })

            segmentsCopy[toggleIdx] = {
                ...state.segments[toggleIdx],
                modalVisible: !state.segments[toggleIdx].modalVisible
            }

            return {
                ...state,
                segments: segmentsCopy
            }
        case 'TOGGLE_TRIP_MODAL':
            return { ...state, modalVisible: !state.modalVisible}
        case 'SET_TRIP_NAME':
            return { ...state, name: payload }
        default:
            return state
    }
}