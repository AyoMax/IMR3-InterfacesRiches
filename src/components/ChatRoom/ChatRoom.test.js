import {render} from '@testing-library/react'
import {ChatRoom} from "./ChatRoom";

test('Chatroom render without crashing', () => {
    const props = {
        messages: [
            {
                when: 1580742794,
                name: "Alice",
                message: "Hi, I'm Alice!"
            },
            {
                when: 1580742479,
                name: "Bob",
                message: "Hi, I'm Bob. Checkout this moment!",
                moment: 462
            }
        ],
        onMomentClick: () => {
        }
    };

    render(<ChatRoom {...props}/>)
});