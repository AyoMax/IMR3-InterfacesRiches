import React from "react";
import {ChatRoom} from "./ChatRoom/ChatRoom";
import {ChatWriter} from "./ChatWriter/ChatWriter";
import PropTypes from "prop-types";

export class Chat extends React.Component
{
    static propTypes = {
        onMomentClick: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            connected: true,
            currentTime: 0,
            messages: []
        }
    }

    componentDidMount() {
        this.initWebsocket();
    }

    /* =================== */
    /* WEBSOCKET METHOD(S) */
    /* =================== */

    initWebsocket()
    {
        const URL = "wss://imr3-react.herokuapp.com";
        this.ws = new WebSocket(URL);

        this.ws.onopen = () => {
            console.log("connected");
            this.setState({
                connected: true
            });
        };

        this.ws.onmessage = evt => {
            const messages = JSON.parse(evt.data);
            messages.map(message => this.addMessage(message));
        };

        this.ws.onclose = () => {
            console.log("disconnected, reconnect.");
            this.setState({
                connected: false,
            });
            this.initWebsocket()
        };
    }

    addMessage(message)
    {
        if (this.ws !== undefined) {
            let stateMessages = this.state.messages;
            stateMessages.push(message)
            this.setState({messages: stateMessages});
        }
    }

    submitMessage = (pseudoString, messageString, momentTimestamp = undefined) => {
        let message = momentTimestamp === undefined
            ? {name: pseudoString, message: messageString}
            : {name: pseudoString, message: messageString, moment: momentTimestamp};
        this.ws.send(JSON.stringify(message));
    };

    /* ===================== */
    /* VIDEO STATE METHOD(S) */
    /* ===================== */

    updateVideoState(videoState) {
        this.setState({currentTime: parseInt(videoState.currentTime)});
        this.chatWriter.updateVideoState(videoState);
    }

    render() {
        return (
            <aside className="chat pt-3">
                <h2 className="px-3">Chat</h2>
                <ChatRoom
                    messages={this.state.messages}
                    onMomentClick={this.props.onMomentClick}/>
                <hr/>
                <ChatWriter
                    ref={chatWriter => {
                        this.chatWriter = chatWriter
                    }}
                    onSendMessage={this.submitMessage}/>
            </aside>
        )
    }
}