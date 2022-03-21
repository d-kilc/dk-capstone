import Map from './Map'

import accessToken from '../config/config.js'
import {Wrapper,Status} from '@googlemaps/react-wrapper'

export default function MapContainer() {
    function render(status) {
        return <h1>{status}</h1>
    }

    return (
        <Wrapper apiKey={accessToken} render={render}>
            <Map/>
        </Wrapper>
    )
}