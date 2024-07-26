import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'


const Mapa = ({position, cidade, estado}) => {
    return (
        position.length > 0?
        <MapContainer center={[position[0], position[1]]} zoom={4} scrollWheelZoom={true} style={{zIndex: '0', borderRadius: '20px'}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position[0], position[1]]}>
            <Popup>
            {cidade}, {estado}
            </Popup>
        </Marker>
        </MapContainer>:
        <div>Nada encontrado</div>
    )
}

export default Mapa