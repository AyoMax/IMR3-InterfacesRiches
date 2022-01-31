import React from "react";
import PropTypes from "prop-types";

export class Keywords extends React.Component {
    static propTypes = {
        keywords: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            selected: -1
        }
    }

    render() {
        const selectedKeywordIndex = this.state.selected;
        if (selectedKeywordIndex >= 0) {
            return (
                <div>
                    <ul>
                        {this.props.keywords[selectedKeywordIndex].data.map((item, index) => (
                            <li>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}