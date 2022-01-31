import React from "react";
import {Player, ControlBar} from 'video-react';
import PropTypes from "prop-types";

export class VideoPlayer extends React.Component {

    static propTypes = {
        film: PropTypes.object.isRequired,
        onStateChange: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        // subscribe state change
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }

    handleStateChange(state, prevState) {
        this.props.onStateChange(state)
    }

    setCurrentTime(seconds) {
        this.player.seek(seconds);
    }

    getCurrentTime(){
        return this.player.getState().currentTime;
    }

    render() {
        const film = this.props.film;

        // TODO : ligne à supprimer lorsque le json Heroku sera update
        film.file_url = "https://ia600900.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4";

        return (
            <div>
                <h1>{film.title}</h1>
                <Player
                    ref={player => {
                        this.player = player;
                    }}
                    autoPlay
                >
                    <source src={film.file_url}/>
                    <ControlBar autoHide={false}/>
                </Player>
            </div>
        );
    }
}