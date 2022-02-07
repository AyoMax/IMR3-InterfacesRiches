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
            moment: ''
        }

        this.handlePseudoChange = this.handlePseudoChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
    }

    handlePseudoChange(evt) {
        this.setState({pseudo: evt.target.value})
    }

    handleMessageChange(evt) {
        this.setState({message: evt.target.value})
    }

    handleSendMsgBtnClick() {

        this.props.onSendMessage(this.state.pseudo, this.state.message);
    }

    render() {
        return (
            <div className="chatwriter">
                <div className="form-group">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input id="pseudo" name="pseudo" type="text"
                           value={this.state.pseudo}
                           onChange={this.handlePseudoChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="newMessage">Message</label>
                    <textarea id="newMessage" name="newMessage"
                              value={this.state.message}
                              onChange={this.handleMessageChange}/>
                </div>
                <div>
                    <input className="btn btn-info" type="button" value="Envoyer"
                           onClick={this.handleSendMsgBtnClick.bind(this)}/>
                </div>
            </div>
        )
    }
}