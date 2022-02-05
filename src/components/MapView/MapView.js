import React from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export class MapView extends React.Component {

    static propTypes = {
        waypoints: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0,
            centerPosition: [41.068192, -99.526149],
            currentWaypoints: []
        }

        this.leafletMap = React.createRef();
    }

    updateState(state){
        this.updatePosition(state.currentTime)
    }

    updatePosition(currentTime){
        let newCurrentWaypoints = []
        this.props.waypoints.forEach(waypoint => {
            if(waypoint.timestamp < currentTime) newCurrentWaypoints.push(waypoint)
        })
        this.setState({
            currentWaypoints: newCurrentWaypoints
        })
    }
    render() {
        return (
            <MapContainer ref={this.leafletMap}
                          id={"map"}
                          dragging={false}
                          center={this.state.centerPosition}
                          zoom={4}
                          style={{height:"300px",width:"100%",position:"relative"}}
                          scrollWheelZoom={false}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                />
                { this.state.currentWaypoints.map((waypoint, index) => (
                    <Marker
                        position={[
                            waypoint.lat,
                            waypoint.lng
                        ]}
                        key={`marker-${index}`}>
                        <Popup>{waypoint.label}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        )
    }
}