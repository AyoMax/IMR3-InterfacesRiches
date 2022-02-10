import {render} from "@testing-library/react";
import {ChatWriter} from "./ChatWriter";

test('ChatWriter render without crashing', () => {
    render(<ChatWriter />)
});