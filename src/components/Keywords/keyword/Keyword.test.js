import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {Keyword} from "./Keyword";

let props = {
    index: 1,
    item: {
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
    lifetime: 120,
    currentTime: 110
};

test('Keyword render in lifetime', () => {
    render(<Keyword {...props}/>)
    screen.queryByText("Route 66")
});

props.currentTime = 130;

test('Keyword render not in lifetime', () => {
    render(<Keyword {...props}/>)
    const title = screen.queryByText('Route 66')
    expect(title).toBeNull()
});