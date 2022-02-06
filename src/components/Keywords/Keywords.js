import React from "react";
import PropTypes from "prop-types";

export class Keywords extends React.Component {
    static propTypes = {
        keywords: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            currentKeywords: []
        }
    }

    updateState(state){
        this.updateKeywords(state.currentTime)
    }

    updateKeywords(currentTime){
        console.log(currentTime)
        let newCurrentKeywords = []
        this.props.keywords.forEach(keyword => {
            if(keyword.pos < currentTime) newCurrentKeywords.push(keyword)
        })
        this.setState({
            currentKeywords: newCurrentKeywords
        })
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.currentKeywords.map((item, index) => (
                        <li>
                            <ul>
                                {item.data.map((keyword, index) => (
                                    <li>
                                        <a href={keyword.url}>{keyword.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}