import {render} from "@testing-library/react";
import {Keywords} from "./Keywords";

test('Keywords render without crashing', () => {
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
    render(<Keywords {...props}/>)
});