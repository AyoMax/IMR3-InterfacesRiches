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
            <div>
                <ul>
                    {this.props.keywords.map((item, index) => (
                        <li key={`keyword-group-${index}`}>
                            <Keyword item={item} lifetime={30} currentTime={this.state.currentTime}/>
                        </li>
                    ), this)}
                </ul>
            </div>
        )
    }
}