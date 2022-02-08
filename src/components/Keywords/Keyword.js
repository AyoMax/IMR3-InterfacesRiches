import React from "react";
import PropTypes from "prop-types";
import classnames from 'classnames';
import {ProgressBar} from "react-bootstrap";

export class Keyword extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        item: PropTypes.object.isRequired,
        lifetime: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0
        }
    }

    getPromptState() {
        return this.props.currentTime > parseInt(this.props.item.pos) && this.props.currentTime <= parseInt(this.props.item.pos) + this.props.lifetime;
    }

    render() {
        if(this.getPromptState()){
            return (
                <li key={`keyword-group-${this.props.index}`}>
                    <ul className={"keyword-list"}>
                        {this.props.item.data.map((keyword, index) => (
                            <li key={`keyword-${index}`}>
                                <a href={keyword.url} target="_blank">{keyword.title}</a>
                            </li>
                        ))}
                    </ul>
                    <ProgressBar now={(this.props.currentTime - parseInt(this.props.item.pos)) * 100 / this.props.lifetime} />
                </li>)
        }else{
            return null
        }
    }
}