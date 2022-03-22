import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../style/Map.css'
export default function SegmentMap({ id, placeIdArr }) {

    const ref = useRef(null)
    const [map, setMap] = useState()
    const [mapOptions, setMapOptions] = useState({
        center: { lat: 0, lng: 0},
        zoom: 2,
    })
    // const [directionsRenderer, setDirectionsRenderer] = useState(new window.google.maps.DirectionsRenderer())
    const [directionsRenderer, setDirectionsRenderer] = useState()

    const thisSegment = useSelector(state => {
        const segmentIdx = state.newTrip.segments.findIndex(segment => {
            return segment.tripSequence === id
        })
        return state.newTrip.segments[segmentIdx]
    })

    // const placesService = new window.google.maps.places.PlacesService(map)
    const directionsService = new window.google.maps.DirectionsService()

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, mapOptions))
        }
    }, [ref, map])

    useEffect(() => {

        if (placeIdArr.length === 2) {
            // setDirectionsRenderer(dr => {

            if (directionsRenderer) {
                directionsRenderer.setMap(null)
                setDirectionsRenderer()
            }

            const dr = new window.google.maps.DirectionsRenderer()
            dr.setMap(map)

            const request = {
                origin: { placeId: placeIdArr[0] },
                destination: { placeId: placeIdArr[1] },
                travelMode: 'DRIVING'
            }

            directionsService.route(request, (result, status) => {
                dr.setDirections(result)
                setDirectionsRenderer(dr)
            })
        }

    }, [placeIdArr])

    function renderFlyRoute() {
        console.log('flyign rotue')
    }

    function renderDriveRoute() {
        console.log('driving route')
    }
        
    return (
        <div id="map" ref={ref}></div>
    )
}