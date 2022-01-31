import React from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export class MapView extends React.Component {

    static propTypes = {
        waypoints: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0,
            centerPosition: [41.068192, -99.526149]
        }

        this.leafletMap = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            console.log("refresh leaflet")
            console.log(this.leafletMap)
            this.leafletMap.current.leafletMap.invalidateSize()
        }, 150);

        this.updatePosition(0);
    }

    updateState(state){
        this.updatePosition(state.currentTime)
    }

    updatePosition(currentTime){
        var waypoint = this.props.waypoints.find((element, index) => {
            if((index < this.props.waypoints.length-1 && element.timestamp < currentTime && this.props.waypoints[index + 1].timestamp < currentTime )){
                return true;
            }

        })
        if(waypoint != null){
            console.log(waypoint)
            this.setState({
                centerPosition: [waypoint.lat, waypoint.lng]
            });
        }
    }
    render() {
        return (
            <MapContainer ref={this.leafletMap}
                          dragging={false}
                          center={this.state.centerPosition}
                          zoom={4}
                          style={{height:"300px",width:"100%",position:"relative"}}
                          scrollWheelZoom={false}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                />
                { this.props.waypoints.map((waypoint, index) => (
                    <Marker
                        position={[
                            waypoint.lat,
                            waypoint.lng
                        ]}
                        key={index}>
                        <Popup>{waypoint.label}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        )
    }
}