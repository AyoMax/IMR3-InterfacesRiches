import React from "react";
import PropTypes from "prop-types";

export class ChatRoom extends React.Component {

    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.shape({
            when: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            moment: PropTypes.number
        })),
        onMomentClick: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            hasFirstScroll: false,
            scrollHeight: 0
        }
    }

    componentDidMount() {
        this.autoScrollToBottom();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.autoScrollToBottom();
    }

    handleMomentClick(evt, timestamp) {
        if (timestamp !== undefined) this.props.onMomentClick(timestamp);
    }

    autoScrollToBottom() {
        this.chatroom.scrollTop = this.chatroom.scrollHeight;

        // if (!this.state.hasFirstScroll) {
        //     this.setState({hasFirstScroll: true});
        // } else if (this.chatroom.scrollTop + this.chatroom.clientHeight === this.state.scrollHeight) {
        //     this.chatroom.scrollTop = this.chatroom.scrollHeight;
        //     this.setState({scrollHeight: this.chatroom.scrollHeight});
        // }
    }

    timestampToString(timestamp) {
        const date = new Date(timestamp);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        return `${hours}:${minutes.slice(-2)}:${seconds.slice(-2)}`;
    }

    momentToString(moment) {
        const date = new Date(moment * 1000);
        let hours = date.getHours() + date.getTimezoneOffset() / 60;
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        return `${hours}:${minutes.slice(-2)}:${seconds.slice(-2)}`;
    }

    render() {
        return (
            <div
                ref={chatroom => {
                    this.chatroom = chatroom
                }}
                className="chatroom">
                {this.props.messages.map((item, index) => (
                    <div key={index} className="msg">
                        <div className="msg-head">
                            <div className="msg-pseudo">{item.name}</div>
                            <div className="msg-date">{this.timestampToString(item.when)}</div>
                        </div>
                        <div className="msg-text">{item.message}</div>
                        {this.props.messages !== undefined && item.moment !== undefined &&
                            <div className="msg-footer">
                                <span className="msg-moment">{this.momentToString(item.moment)}</span>
                                <button className="btn-mini btn-white"
                                        data-moment={item.moment}
                                        onClick={(event) => this.handleMomentClick(event, item.moment)}>
                                    Go
                                </button>
                            </div>
                        }
                    </div>
                ))}
            </div>
        )
    }
}