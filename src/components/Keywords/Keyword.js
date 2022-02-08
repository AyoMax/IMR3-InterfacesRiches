import React from "react";
import PropTypes from "prop-types";
import classnames from 'classnames';

export class Keyword extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        lifetime: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            prompt: true
        }

        // setTimeout(() => {
        //     this.setState({
        //         prompt: false
        //     })
        // }, this.props.lifetime)
    }

    render() {
        let className = classnames({
            on : this.state.prompt,
            off : !this.state.prompt
        })
        return (
            <ul className={className}>
                {this.props.item.data.map((keyword, index) => (
                    <li key={`keyword-${index}`}>
                        <a href={keyword.url}>{keyword.title}</a>
                    </li>
                ))}
            </ul>
        )
    }
}