import React from "react";
import PropTypes from "prop-types";
import {ListGroup} from "react-bootstrap";

export class VideoChapters extends React.Component {
    static propTypes = {
        chapters: PropTypes.array.isRequired,
        onChapterClick: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0
        }
    }

    handleChapterClick(index) {
        this.props.onChapterClick(index);
    }

    updateState(state) {
        this.setState({
            currentTime: state.currentTime
        })
    }

    getState(index){
        let state = ""
        if(index+1 < this.props.chapters.length){
            if(this.props.chapters[index].pos <= this.state.currentTime && this.props.chapters[index+1].pos > this.state.currentTime) state="active"
        }else{
            if(this.props.chapters[index].pos <= this.state.currentTime) state="active"
        }
        return state
    }

    render() {
        return (
            <div className={"chapters-component"}>
                <h2>Chapitres</h2>
                <ListGroup numbered>
                    {this.props.chapters.map((item, index) => (
                        <ListGroup.Item
                            className={this.getState(index)}
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