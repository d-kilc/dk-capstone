import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import store from '../store'
import '../style/Map.css'
export default function Map() {

    const ref = useRef(null)
    const [map, setMap] = useState()

    // const [directionsRenderers, setDirectionsRenderers] = useState([])
    // const [polylines, setPolylines] = useState([])
    const [mappedRoutes, setMappedRoutes] = useState([])

    const newTrip = useSelector(state => state.newTrip)
    console.log('newTrip: ', newTrip)

    const directionsService = new window.google.maps.DirectionsService()
    const placesService = new window.google.maps.places.PlacesService(map)

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: { lat: 0, lng: 0},
                zoom: 2,
            }))
        }
    },[ref,map])

    useEffect(() => {
        // setPolylines()
        // setDirectionsRenderers()

        mappedRoutes.forEach(route => {
            // first clear the map of all previous routes.
            if (route.hasOwnProperty('geodesic')) {
                // then its a polyline (flying/other). remove it
                route.setPath()
            }
            // do this for both polylines and dr's.
            route.setMap()
        })

        const newMappedRoutes = []

        newTrip.segments.forEach(segment => {
            if (segment.how === '') return
            if (segment.how !== 'drive') {
                placesService.getDetails({ placeId: segment.from.id, fields: ['geometry'] },
                    (result, status) => {
                        const fromResult = result.geometry.location
                        placesService.getDetails({ placeId: segment.to.id, fields: ['geometry'] },
                            (result, status) => {
                                const toResult = result.geometry.location
                                const polyline = new window.google.maps.Polyline({
                                    geodesic: true,
                                    path: [fromResult, toResult],
                                    strokeColor: '#7EB5FA',
                                    strokeOpacity: 0.8,
                                    strokeWeight: 6,
                                })
                                polyline.setMap(map)
                                newMappedRoutes.push(polyline)

                            }
                        )
                    }
                )
                return
            } else {
                // if driving create directions renderer and pass request to route function
                const dr = new window.google.maps.DirectionsRenderer()
            
                const request = {
                    origin: { placeId: segment.from.id },
                    destination: { placeId: segment.to.id },
                    travelMode: 'DRIVING'
                }
        
                directionsService.route(request, (result, status) => {
                    dr.setDirections(result)
                    dr.setMap(map)
                })

                newMappedRoutes.push(dr)
            }

        })
        setMappedRoutes(newMappedRoutes)
    }, [newTrip.segments])

    return (
        <div id="map" ref={ref}></div>
    )
}