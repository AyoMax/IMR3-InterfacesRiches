import {render} from "@testing-library/react";
import {Keyword} from "./Keyword";

test('Keywords render without crashing', () => {
    const props = {
        key: 1,
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
        lifetime: 120
    };
    render(<Keyword {...props}/>)
});