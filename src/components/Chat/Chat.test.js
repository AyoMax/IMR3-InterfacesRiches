import {render} from "@testing-library/react";
import {Chat} from "./Chat";

test('Chat render without crashing', () => {
    const props = {
        onMomentClick: () => {}
    };

    render(<Chat {...props}/>)
})