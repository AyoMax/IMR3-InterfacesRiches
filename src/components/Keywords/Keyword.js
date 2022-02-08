import React from "react";
import PropTypes from "prop-types";
import classnames from 'classnames';

export class Keyword extends React.Component {
    static propTypes = {
        key: PropTypes.string.isRequired,
        item: PropTypes.object.isRequired,
        lifetime: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            prompt: true,
            currentTime: 0
        }
    }

    render() {
        if(this.props.currentTime >= this.props.item.pos && this.props.currentTime <= parseInt(this.props.item.pos) + this.props.lifetime){
            return (
                <li key={this.props.key}>
                    <ul>
                        {this.props.item.data.map((keyword, index) => (
                            <li key={`keyword-${index}`}>
                                <a href={keyword.url} target="_blank">{keyword.title}</a>
                            </li>
                        ))}
                    </ul>
                </li>)
        }else{
            return null
        }
    }
}