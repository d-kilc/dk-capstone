import { Modal, Box, } from '@mui/material'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import store from '../store'
import { useState } from 'react'
import AddEvent from './AddEvent'
import EditEvent from './EditEvent'



const localizer = momentLocalizer(moment)

export default function TripCalendar() {
    
    const [modalVisible, setModalVisible] = useState({visible: false, action: ''})

    const auth = useSelector(state => state.auth)
    console.log(auth)
    const trip = useSelector(state => state.trip)
    console.log(trip)
    // const events = useSelector(state => state.events)
    // console.log(events)

    // function handlePostEvent() {
    //     fetch('/trips/')
    // }

    useEffect(() => {
        fetch(`/trips/${trip.currentTrip.id}/events`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    store.dispatch({
                        type: 'SET_EVENTS',
                        payload: {
                            events: [...data]
                        },
                    })
                })
            } else {
                res.json().then(data => {
                    alert(data.errors)
                })
            }
        })
        // return events.map((event) => {
        //     return {
        //         name: event.name,
        //         description: event.description,
        //         start: new Date(event.start),
        //         end: new Date(event.end),
        //         allDay: false,
        //         resource: event.id,
        //     }
        // })
    }, [])

    function buildSegmentEvents() {
        return trip.currentTrip.segments.map((segment, index) => {
            if (index === 0) return
            return {
                title: segment.from,
                start: new Date(trip.currentTrip.segments[index - 1].when),
                end: new Date(segment.when),
                allDay: true,
                resource: segment.id,
            }
        })
    }

    function buildEvents() {
        return trip.events.map(event => {
            return {
                title: event.name,
                description: event.description,
                start: new Date(event.start),
                end: new Date(event.end),
                allDay: false,
                resource: event.id,
            }
        })
    }

    const segmentEvents = buildSegmentEvents()
    const events = buildEvents()
    // const trip

    function handleDisplayEventDetail(event) {
        store.dispatch({
            type: 'SET_CURRENT_EVENT',
            payload: event,
        })
        setModalVisible({visible: !modalVisible, action: 'EDIT'})
    }

    function handleCreateNewEvent(e) {
        console.log(e)
        store.dispatch({
            type: 'INITIALIZE_NEW_EVENT',
            payload: {
                userId: auth.user.id,
                tripId: trip.currentTrip.id,
                start: new Date(e.start),
                end: new Date(e.end)
            }
        })
        setModalVisible({visible: true, action: 'ADD'})
    }

    return (
        <>
         <Calendar
            selectable
            onSelectSlot={handleCreateNewEvent}
            onSelectEvent={handleDisplayEventDetail}
            drilldownView="day"
            localizer={localizer}
            events={[...segmentEvents, ...events]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 400 }}
            defaultView="week"
        />
        {modalVisible.action === 'EDIT' ? (
            <Modal disableAutoFocus={true} open={true} onClose={() => setModalVisible(false)}>
                <Box sx={{
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    // width: '50%',
                    // height: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <EditEvent handleToggleModal={setModalVisible} />
                </Box>
            </Modal>
        ) : (
            <></>
        )}

        {modalVisible.action === 'ADD' ? (
            <Modal disableAutoFocus={true} open={true} onClose={() => setModalVisible(false)}>
                <Box sx={{
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    // width: '50%',
                    // height: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <AddEvent handleToggleModal={setModalVisible} />
                </Box>
            </Modal>
        ) : (
            <></>
        )}

        
        </>
    )
}