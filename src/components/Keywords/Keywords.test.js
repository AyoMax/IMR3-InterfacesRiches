import React from "react";
import {render, screen} from "@testing-library/react";
import {Keywords} from "./Keywords";

const props = {
    keywords: [
        {
            pos: 0,
            data: [
                {
                    title: "Route 66",
                    url: "https://en.wikipedia.org/wiki/U.S._Route_66"
                },
                {
                    title: "Stefan Kluge",
                    url: "http://www.imdb.com/name/nm1667631/"
                },
                {
                    title: "Mathias Einmann",
                    url: "http://www.imdb.com/name/nm1667578/"
                }
            ]
        },
        {
            pos: 117,
            data: [
                {
                    title: "New Mexico",
                    url: "https://en.wikipedia.org/wiki/New_Mexico"
                },
                {
                    title: "Cadillac",
                    url: "https://en.wikipedia.org/wiki/Cadillac_Series_62"
                }
            ]
        }
    ]
};

test('Keywords render without crashing', () => {
    render(<Keywords {...props}/>)
});

test('Keywords render in currentTime', () => {
    let keyRef = React.createRef();
    render(<Keywords ref={keyRef} {...props}/>)
    let state = {
        currentTime: 10
    }
    keyRef.current.updateState(state);
    screen.queryByText('Route 66');
    screen.queryByText('Stefan Kluge');
    screen.queryByText('Mathias Einmann');
});

test('Keywords render not in currentTime', () => {
    let keyRef = React.createRef();
    const {container} = render(<Keywords ref={keyRef} {...props}/>)
    let state = {
        currentTime: 500
    }
    keyRef.current.updateState(state);
    const title1 = screen.queryByText('Route 66');
    const title2 = screen.queryByText('Stefan Kluge');
    const title3 = screen.queryByText('Mathias Einmann');

    expect(title1).toBeNull();
    expect(title2).toBeNull();
    expect(title3).toBeNull();

    screen.queryByText('Aucun mot-clés, actuellement');
});