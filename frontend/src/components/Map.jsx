import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function Map({ mapHeight, lat, long, popupText }) {

    const position = [lat, long]

    return (
        <>
            <div id="map" >
                <MapContainer style={{ height: mapHeight }} center={position} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            {popupText}
                        </Popup>
                    </Marker>

                    
                </MapContainer>
            </div>
        </>
    )
}

export default Map