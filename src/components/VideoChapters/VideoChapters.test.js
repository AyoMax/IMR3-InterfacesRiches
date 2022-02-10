import React from "react";
import {fireEvent, render} from "@testing-library/react";
import {VideoChapters} from "./VideoChapters";

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
    ]
};

let callbackValue = undefined;

function defaultCallback(value){
    callbackValue = value;
}

test('VideoChapters render without crashing', () => {
    render(<VideoChapters {...props} onChapterClick={() => { return }}/>)
});

test('VideoChapters check length', () => {
    const {container} = render(<VideoChapters {...props} onChapterClick={() => { return }}/>)
    const chapters = container.querySelectorAll(".chapter")
    expect(chapters.length).toBe(props.chapters.length)
});

test('VideoChapters check active 1', () => {
    let chaptersRef = React.createRef();
    const {container} = render(<VideoChapters ref={chaptersRef} {...props} onChapterClick={() => { return }}/>)
    let state = {
        currentTime: 5
    }
    chaptersRef.current.updateState(state);
    const chapters = container.querySelector(".active").getString();
    expect(chapters).toBe(props.chapters[0].title)
});

test('VideoChapters check active 2 (end chapter)', () => {
    let chaptersRef = React.createRef();
    const {container} = render(<VideoChapters ref={chaptersRef} {...props} onChapterClick={() => { return }}/>)
    let state = {
        currentTime: 500
    }
    chaptersRef.current.updateState(state);
    const chapters = container.querySelector(".active").getString();
    expect(chapters).toBe(props.chapters[props.chapters.length-1].title)
});

test('VideoChapters check click', () => {
    let chaptersRef = React.createRef();
    const {container} = render(<VideoChapters ref={chaptersRef} {...props} onChapterClick={defaultCallback}/>)
    const chaptersBtn = container.querySelector("button.chapter");
    fireEvent.click(chaptersBtn);
    expect(callbackValue).toBe(props.chapters[0].pos)
});

