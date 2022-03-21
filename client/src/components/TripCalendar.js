import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

export default function TripCalendar() {
    const events = [{title: 'test', start: moment() }]

    return (
        <Calendar
            selectable
            // onSelectSlot={handleSelectSlot}
            // onDoubleClickEvent={handleDeleteEvent}
            drilldownViewx="day"
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 400 }}
            defaultView="week"
        />
    )
}