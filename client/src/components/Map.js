import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import store from '../store'
import '../style/Map.css'
export default function Map() {

    const ref = useRef(null)
    const [map, setMap] = useState()
    const [mapOptions,setMapOptions] = useState({
        center: { lat: 0, lng: 0},
        zoom: 2,
    })
    const [directionsRenderers, setDirectionsRenderers] = useState([])
    // console.log(directionsRenderers)

    const newTrip = useSelector(state => state.newTrip)
    console.log('newTrip: ', newTrip)

    const directionsService = new window.google.maps.DirectionsService()

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, mapOptions))
        }
    },[ref,map])
    
    // useEffect(() => {

    //     if (directionsRenderers.length > 0) {
    //         directionsRenderers.forEach(dr => {
    //             dr.setMap(null)
    //         })
    //     }

    //     const newDrs = []

    //     newTrip.segments.forEach(segment => {
    //         console.log('segment!')
    //         if (!segment.from.id || !segment.to.id) return
    //         console.log('firing')
    //         const dr = new window.google.maps.DirectionsRenderer()
    //         dr.setMap(map)

    //         //TO DO: Add logic for other modes of transport.
    //         const request = {
    //             origin: { placeId: segment.from.id },
    //             destination: { placeId: segment.to.id },
    //             travelMode: 'DRIVING'
    //         }


    //         directionsService.route(request, (result, status) => {
    //             dr.setDirections(result)
    //             newDrs.push(dr)
    //             // setDirectionsRenderers([...directionsRenderers, dr])
    //         })
    //     })

    //     setDirectionsRenderers(newDrs)

    // }, [newTrip.segments.length])

    useEffect(() => {
        directionsRenderers.forEach(dr => {
            dr.setMap(null)
        })
        setDirectionsRenderers([])
        const drs = newTrip.segments.map(segment => {
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
            return dr
        })
        console.log('drs: ',drs)
        setDirectionsRenderers(drs)
    }, [newTrip.segments])

    return (
        <div id="map" ref={ref}></div>
    )
}