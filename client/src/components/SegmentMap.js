import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../style/Map.css'
export default function SegmentMap({ id, segmentInfo }) {
    
    const ref = useRef(null)
    const [map, setMap] = useState()
    const [directionsRenderer, setDirectionsRenderer] = useState()
    const [latLngs, setLatLngs] = useState([])
    const [polyline, setPolyline] = useState(new window.google.maps.Polyline({geodesic: true, strokeColor: '#7EB5FA', strokeOpacity: 0.9, strokeWeight: 6}))
    
    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: { lat: 0, lng: 0},
                zoom: 2,
            }))
        }
    }, [ref, map])

    const directionsService = new window.google.maps.DirectionsService()
    const placesService = new window.google.maps.places.PlacesService(map)
    polyline.setMap(map)

    useEffect(() => {
        // segmentInfo is updated on Preview Route
        // this will render the path on the map based
        // on transit chosen

        if (segmentInfo.from !== '' && segmentInfo.to !==  '' && segmentInfo.how !== '') {
            // setDirectionsRenderer(dr => {
            if(segmentInfo.how !== 'drive') {
                console.log('flying')
                renderFlyRoute()
                return
            }
            console.log('driving')
            renderDriveRoute()
            setLatLngs([])
        }
    }, [segmentInfo])

    useEffect(() => {
        polyline.setPath(latLngs)
        zoomToObject(polyline)
    }, [latLngs])


    function renderFlyRoute() {
        if (directionsRenderer) {
            directionsRenderer.setMap(null)
            setDirectionsRenderer()
        }

        placesService.getDetails({ placeId: segmentInfo.from, fields: ['geometry'] },
            (result, status) => {
                // setLatLngs([...latLngs, result.geometry.location])
                const fromResult = result.geometry.location

                placesService.getDetails({ placeId: segmentInfo.to, fields: ['geometry'] },
                    (result, status) => {
                        const toResult = result.geometry.location
                        setLatLngs([ fromResult, toResult ])
                    }
                )
            }
        )
    }

    function renderDriveRoute() {
        polyline.setPath()
        polyline.setMap()

        if (directionsRenderer) {
            directionsRenderer.setMap(null)
            setDirectionsRenderer()
        }

        const dr = new window.google.maps.DirectionsRenderer()
        dr.setMap(map)

        const request = {
            origin: { placeId: segmentInfo.from },
            destination: { placeId: segmentInfo.to },
            travelMode: 'DRIVING'
        }

        directionsService.route(request, (result, status) => {
            dr.setDirections(result)
            setDirectionsRenderer(dr)
        })
       
    }   
    
    function zoomToObject(obj){
        const bounds = new window.google.maps.LatLngBounds()
        const points = obj.getPath().getArray()
        for (let n = 0; n < points.length ; n++){
            bounds.extend(points[n])
        }

        if (map) {
            map.fitBounds(bounds)
        }
        
    }
        
    return (
        <div id="map" ref={ref}></div>
    )
}