import { useRef, useEffect, useState } from 'react'
import '../style/Map.css'
export default function Map() {

    const ref = useRef(null)
    const [map,setMap] = useState()
    const [mapOptions,setMapOptions] = useState({
        center: { lat: 0, lng: 0},
        zoom: 2,
    })

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, mapOptions))
        }
    },[ref,map])

    return (
        <div id="map" ref={ref}></div>
    )
}