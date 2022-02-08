import {render} from "@testing-library/react";
import {VideoPlayer} from "./VideoPlayer";

test('VideoPlayer render without crashing', () => {
    const props = {
        film: {
            file_url: "https://ia801406.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4",
            title: "Route 66, An American (Bad) Dream",
            synopsis_url: "https://wiki.creativecommons.org/wiki/Route_66_-_An_American_(bad)_Dream"
        },
        onStateChange: () => {
        }
    };

    render(<VideoPlayer {...props} />)
});