import {render} from "@testing-library/react";
import {VideoChapters} from "./VideoChapters";

test('VideoChapters render without crashing', () => {
    const props = {
        chapters: [
            {
                pos: 0,
                title: "Start"
            },
            {
                pos: 45,
                title: "Intro"
            }
        ],
        onChapterClick: () => {
        }
    };

    render(<VideoChapters {...props} />)
});