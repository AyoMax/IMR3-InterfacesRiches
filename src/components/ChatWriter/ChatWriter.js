import React from "react";
import PropTypes from "prop-types";

export class ChatWriter extends React.Component {
    static propTypes = {
        onSendMessage: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            pseudo: '',
            message: '',
            currentTime: 0,
            isMomentSent: false
        }

        this.handlePseudoChange = this.handlePseudoChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleCheckMoment = this.handleCheckMoment.bind(this);
    }

    updateVideoState(videoState) {
        this.setState({currentTime: parseInt(videoState.currentTime)});
    }

    handlePseudoChange(evt) {
        this.setState({pseudo: evt.target.value});
    }

    handleMessageChange(evt) {
        this.setState({message: evt.target.value});
    }

    handleCheckMoment(evt) {
        this.setState({isMomentSent: evt.target.checked});
    }

    handleSendMsgBtnClick() {
        let moment = this.state.isMomentSent ? this.state.currentTime : undefined;
        this.props.onSendMessage(this.state.pseudo, this.state.message, moment);
        this.setState({isMomentSent: false});
    }

    timestampToString(timestamp) {
        const date = new Date(timestamp);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        return `${hours}:${minutes.substring(-2)}:${seconds.substring(-2)}`;
    }

    render() {
        return (
            <div className="chatwriter">
                <div className="form-group">
                    <input id="pseudo" name="pseudo" type="text"
                           placeholder="Pseudo"
                           value={this.state.pseudo}
                           onChange={this.handlePseudoChange}/>
                    <textarea id="newMessage" name="newMessage"
                              placeholder="Message"
                              value={this.state.message}
                              onChange={this.handleMessageChange}/>
                </div>
                <div className="btn-group">
                    <div className="btn btn-blue-light">
                        <i className="bi bi-hourglass-split"/>
                        <span>{this.timestampToString(this.state.currentTime)}</span>
                        <input type="checkbox" checked={this.state.isMomentSent} onChange={this.handleCheckMoment}/>
                    </div>

                    <input className="btn btn-blue" type="button" value="Envoyer"
                           onClick={this.handleSendMsgBtnClick.bind(this)}/>
                </div>
            </div>
        )
    }
}