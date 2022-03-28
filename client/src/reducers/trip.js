export default function tripReducer(state = { 
    events: [],
    currentEvent: {},
    newEvent: {},
    // currentTrip: {}
}, action) {
    const { type, payload } = action
    switch (type) {
        case 'SET_TRIP':
            return {
                ...state,
                currentTrip: payload,
            }
        case 'UPDATE_TRIP':
            return {
                ...state,
                currentTrip: {
                    ...state.currentTrip,
                    name: payload.name
                }
            }
        case 'SAVE_UPDATED_TRIP':
            return {
                ...state,
                currentTrip: {
                    ...state.currentTrip,
                    name: payload.name
                }
            }
        case 'UPDATE_TRIP_USERS':
            return {
                ...state,
                currentTrip: {
                    ...state.currentTrip,
                    user_trips: [...state.currentTrip.user_trips, {id: payload.id, user: {...payload.user}}]
                }
            }
        case 'SET_EVENTS':
            return {
                ...state,
                events: [...payload.events],
            }
        case 'SET_CURRENT_EVENT':
            return {
                ...state,
                currentEvent: {...payload}
            }
        case 'UPDATE_EVENT':
            return {
                ...state,
                currentEvent: {
                    ...state.currentEvent,
                    [payload.key]: payload.value,
                }
            }
        case 'SAVE_UPDATED_EVENT':
            const updateIdx = state.events.findIndex(event => event.id === payload.id)
            const copy = [...state.events]
            copy[updateIdx] = {
                ...state.events[updateIdx],
                name: payload.name,
                description: payload.description,
            } 
            return {
                ...state,
                events: [...copy]
            }
        case 'DELETE_EVENT':
            const eventsCopy = [...state.events]
            const index = eventsCopy.findIndex(event => event.id === payload.eventId)
            eventsCopy.splice(index, 1)
            return {
                ...state,
                events: eventsCopy,
            }
        case 'INITIALIZE_NEW_EVENT':
            return {
                ...state,
                newEvent: {
                    name: '',
                    description: '',
                    tripId: payload.tripId, 
                    userId: payload.userId,
                    start: payload.start,
                    end: payload.end,
                }
            }
        case 'EDIT_NEW_EVENT':
            const newEventCopy = {...state.newEvent}
            newEventCopy[payload.key] = payload.value
            return {
                ...state,
                newEvent: newEventCopy,
            }
        case 'CREATE_EVENT':
            const newEvent = { ...payload }
            return {
                ...state,
                events: [...state.events, newEvent]
            }
        default:
            return state
    }
}