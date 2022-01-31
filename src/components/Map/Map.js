import React from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


export class Map extends React.Component {
    static propTypes = {
        waypoints: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0,
            posIndex: 0
        }
        this.updatePosition(0);
    }

    updateState(state){
        this.updatePosition(state.currentTime)
    }

    updatePosition(currentTime){
        if(this.props.waypoints[this.state.posIndex].timestamp == currentTime){
            this.setState({
                posIndex: this.state.posIndex++,
                position: [this.props.waypoints[this.state.posIndex].lat, this.props.waypoints[this.state.posIndex].lng]
            });
        }
    }
render() {
        return (
            <MapContainer center={this.state.position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={this.state.position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        )
    }
}