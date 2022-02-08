import React from "react";
import PropTypes from "prop-types";
import * as L from "leaflet";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

const LeafIcon = L.Icon.extend({
    options: {}
});

const blueIcon = new LeafIcon({
        iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
        iconAnchor: [12, 41],
        popupAnchor: [-1, -30]
    }),
    greenIcon = new LeafIcon({
        iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
        iconAnchor: [12, 41],
        popupAnchor: [-1, -30]
    }),
    yellowIcon = new LeafIcon({
        iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|efef62&chf=a,s,ee00FFFF",
        iconAnchor: [12, 41],
        popupAnchor: [-1, -30]
    });

export class MapView extends React.Component {

    static propTypes = {
        waypoints: PropTypes.array.isRequired,
        onMarkerClick: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            centerPosition: [41.068192, -99.526149],
            currentTime: 0
        }

        this.mapRef = React.createRef();
    }

    updateState(state) {
        // this.updatePosition(state.currentTime)
        this.setState({
            currentTime: state.currentTime
        })
    }

    handleMarkerClick(waypoint) {
        this.props.onMarkerClick(parseInt(waypoint.timestamp) + 5);
    }

    getIcon(index, currentTime) {
        let icon;
        let currentWaypoint = this.props.waypoints[index];
        let nextTimePoint;

        let nextIndex = index + 1;
        let find = false;
        while (nextIndex < this.props.waypoints.length && !find) {
            if (this.props.waypoints[index].timestamp === this.props.waypoints[nextIndex].timestamp) find = true;
            nextIndex++;
        }
        nextIndex = find ? nextIndex : index + 1

        if (nextIndex < this.props.waypoints.length) {
            nextTimePoint = this.props.waypoints[nextIndex].timestamp;
        } else {
            nextTimePoint = this.props.waypoints[index].timestamp + 1
        }

        if (currentWaypoint.timestamp <= currentTime && nextTimePoint > currentTime) {
            icon = yellowIcon
        } else if (currentWaypoint.timestamp <= currentTime) {
            icon = greenIcon
        } else {
            icon = blueIcon
        }

        return icon
    }

    render() {
        return (
            <MapContainer whenCreated={mapInstance => {
                this.mapRef.current = mapInstance
            }}
                          center={this.state.centerPosition}
                          zoom={4}
                          style={{height: "300px", width: "100%", position: "relative"}}
                          scrollWheelZoom={false}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                />
                {this.props.waypoints.map((waypoint, index) => (
                    <Marker
                        position={[
                            waypoint.lat,
                            waypoint.lng
                        ]}
                        key={`marker-${index}`}
                        icon={this.getIcon(index, this.state.currentTime)}
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