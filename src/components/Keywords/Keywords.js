import React from "react";
import PropTypes from "prop-types";
import {Keyword} from "./Keyword";

export class Keywords extends React.Component {
    static propTypes = {
        keywords: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0
        }
    }

    updateState(state){
        this.setState({
            currentTime: state.currentTime
        })
    }

    render() {
        return (
            <div class={"keyword-component"}>
                <h2>Mots-Clés</h2>
                <ul class={"keywords-list"}>
                    {this.props.keywords.map((item, index) => (
                        <Keyword key={`keyword-group-${index}`} item={item} lifetime={120} currentTime={this.state.currentTime}/>
                    ))}
                </ul>
            </div>
        )
    }
}