import {render} from "@testing-library/react";
import {ChatWriter} from "../Chat/ChatWriter/ChatWriter";
import {MapView} from "./MapView";

test('MapView render without crashing', () => {
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
        ],
        onMarkerClick: () => {}
    };
    render(<MapView {...props}/>)
});