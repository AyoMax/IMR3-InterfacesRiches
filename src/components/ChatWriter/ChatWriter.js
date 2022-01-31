import React from "react";
import PropTypes from "prop-types";

export class ChatWriter extends React.Component {
    static propTypes = {
        onSendMessage: PropTypes.func
    }

    handleSendMsgBtnClick() {
        this.props.onSendMessage();
    }

    render() {
        return (
            <div>
                <div>
                    <label htmlFor="newMessage">Message</label>
                    <textarea id="newMessage" name="newMessage">
                    </textarea>
                </div>
                <div>
                    <input type="button" value="Envoyer" onClick={this.handleSendMsgBtnClick.bind(this)}/>
                </div>
            </div>
        )
    }
}