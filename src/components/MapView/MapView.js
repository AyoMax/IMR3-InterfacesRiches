import React from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export class MapView extends React.Component {

    static propTypes = {
        waypoints: PropTypes.array.isRequired,
        onMarkerClick: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            centerPosition: [41.068192, -99.526149],
            currentWaypoints: []
        }

        this.mapRef = React.createRef();
    }

    updateState(state){
        console.log(state)
        this.updatePosition(state.currentTime)
    }

    updatePosition(currentTime){
        let newCurrentWaypoints = []
        let oldCurrentWaypointsLength = this.state.currentWaypoints.length
        this.props.waypoints.forEach(waypoint => {
            if(waypoint.timestamp < currentTime) newCurrentWaypoints.push(waypoint)
        })
        let newCurrentWaypointsLength = newCurrentWaypoints.length
        this.setState({
            currentWaypoints: newCurrentWaypoints
        })
        if(newCurrentWaypointsLength != oldCurrentWaypointsLength){
            this.mapRef.current.setView([newCurrentWaypoints.at(-1).lat, newCurrentWaypoints.at(-1).lng])
        }
    }

    handleMarkerClick(waypoint) {
        this.mapRef.current.setView([waypoint.lat, waypoint.lng])
        console.log([waypoint.lat, waypoint.lng])
        this.props.onMarkerClick(waypoint.timestamp);
    }

    render() {
        return (
            <MapContainer whenCreated={ mapInstance => { this.mapRef.current = mapInstance } }
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
                        key={`marker-${index}`}
                        eventHandlers={{
                            click: this.handleMarkerClick.bind(this, waypoint)
                        }}>
                        <Popup>{waypoint.label}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        )
    }
}