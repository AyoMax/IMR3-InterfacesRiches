import React from "react";
import PropTypes from "prop-types";
import {ListGroup} from "react-bootstrap";

export class VideoChapters extends React.Component {
    static propTypes = {
        chapters: PropTypes.array.isRequired,
        onChapterClick: PropTypes.func.isRequired
    }

    handleChapterClick(index) {
        this.props.onChapterClick(index);
    }

    render() {
        return (
            <div className={"chapters-component"}>
                <h2>Chapitres</h2>
                <ListGroup numbered>
                    {this.props.chapters.map((item, index) => (
                        <ListGroup.Item
                            action
                            key={index}
                            onClick={this.handleChapterClick.bind(this, index)}
                        >
                            {item.title}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        )
    }
}