import React from "react";
import PropTypes from "prop-types";

export class ChatRoom extends React.Component {

    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.shape({
            when: PropTypes.string.isRequired,
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

    render() {
        return (
            <div class="chatroom">
                {this.props.messages.map((item, index) => (
                    <div class="message">
                        <div>{item.name}</div>
                        <div>{item.message}</div>
                        {(item) => {
                            if (item.moment !== undefined) {
                                return (
                                    <button data-moment={item.moment}
                                            onClick={this.handleMomentClick.bind(item.moment)}>
                                        Moment à voir
                                    </button>
                                )
                            }
                        }}
                    </div>
                ))}
            </div>
        )
    }
}