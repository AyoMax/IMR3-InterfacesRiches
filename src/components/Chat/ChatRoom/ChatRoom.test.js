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

test('Chatroom contain 3 message', () => {
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
            },
            {
                when: 1580742485,
                name: "Truc",
                message: "Test test",
                moment: 462
            }
        ],
        onMomentClick: () => {
        }
    };

    const {container} = render(<ChatRoom {...props}/>);
    const messages = container.querySelectorAll(".msg");
    expect(messages.length).toBe(3);
});

test('Chatroom doesn\'t contain message', () => {
    const props = {
        messages: [],
        onMomentClick: () => {
        }
    };

    const {container} = render(<ChatRoom {...props}/>);
    const messages = container.querySelectorAll(".msg");
    expect(messages.length).toBe(0);
});