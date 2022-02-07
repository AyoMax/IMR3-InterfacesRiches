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
        onMomentClick: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    handleMomentClick(seconds) {
        this.props.onMomentClick(seconds);
    }

    formattedTimestamp(timestamp) {
        let date = new Date(timestamp);
        return `${date.getUTCHours()}h ${date.getUTCMinutes()}min ${date.getUTCSeconds()}s`;
    }

    render() {
        return (
            <div className="chatroom">
                {this.props.messages.map((item, index) => (
                    <div key={index} className="msg">
                        <div className="msg-head">
                            <div className="msg-pseudo">{item.name}</div>
                            <div className="msg-date">{this.formattedTimestamp(item.when)}</div>
                        </div>
                        <div>{item.message}</div>
                        {item.moment !== undefined &&
                            <button data-moment={item.moment}
                                    onClick={this.handleMomentClick.bind(item.moment)}>
                                Moment à voir
                            </button>
                        }
                    </div>
                ))}
            </div>
        )
    }
}