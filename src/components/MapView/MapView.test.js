import React from "react";
import {render, screen} from "@testing-library/react";
import {configure, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Marker} from "react-leaflet";
import {MapView} from "./MapView";

configure({ adapter: new Adapter() });

const props = {
    waypoints: [
        {
            lat: "32.42",
            lng: "-90.13",
            label: "Ridgeland",
            timestamp: 45
        },
        {
            lat: "38.90",
            lng: "-77.04",
            label: "Washington DC",
            timestamp: 300
        }
    ]
};

function callback(chapter) {
    return null
}

test('MapView render without crashing', () => {
    render(<MapView {...props} onMarkerClick={callback}/>)
});

test('MapView check number of markers', () => {
    const component = mount(<MapView {...props} onMarkerClick={callback}/>);
    const markers = component.find(Marker)
    expect(markers).toHaveLength(2);
})

