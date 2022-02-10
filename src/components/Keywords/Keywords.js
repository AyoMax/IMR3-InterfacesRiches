import React from "react";
import PropTypes from "prop-types";
import {Keyword} from "./keyword/Keyword";

export class Keywords extends React.Component {
    static propTypes = {
        keywords: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            defaultPrompt: true,
            currentTime: 0
        }

        this.keyRefs = [];
        this.props.keywords.forEach((el, index) => {
            this.keyRefs[index] = React.createRef();
        })
    }

    updateState(state){
        this.setState({
            currentTime: state.currentTime
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let prompt = this.checkForDefaultPrompt()
        if(prompt != prevState.defaultPrompt){
            this.setState({
                defaultPrompt: prompt
            })
        }
    }

    checkForDefaultPrompt(){
        let prompted = true
        this.keyRefs.forEach((el)=>{
            prompted = prompted && !el.current.getPromptState()
        })
        return prompted;
    }

    render() {
        return (
            <div className={"keyword-component"}>
                <h2>Mots-Clés</h2>
                <ul className={"keywords-list"}>
                    {this.props.keywords.map((item, index) => (
                        <Keyword key={`keyword-${index}`}
                                 ref={this.keyRefs[index]}
                                 index={index}
                                 item={item}
                                 lifetime={120}
                                 currentTime={this.state.currentTime}/>
                    ))}
                    {this.state.defaultPrompt &&
                        <li className={"default-keyword"}>
                            <p className={"italic"}>Aucun mot-clés, actuellement</p>
                        </li>
                    }
                </ul>
            </div>
        )
    }
}