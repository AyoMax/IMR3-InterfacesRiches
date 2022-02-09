import React from "react";
import './App.scss';
import {VideoPlayer} from "./components/VideoPlayer/VideoPlayer";
import {VideoChapters} from "./components/VideoChapters/VideoChapters";
import {ChatRoom} from "./components/ChatRoom/ChatRoom";
import {ChatWriter} from "./components/ChatWriter/ChatWriter";
import {MapView} from "./components/MapView/MapView";
import {Col, Container, Row, Tabs, Tab} from "react-bootstrap";
import {Keywords} from "./components/Keywords/Keywords";
let backup_data = require('./data.json');


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: true,
            data_loaded: false,
            data: {},
            messages: []
        }
    }

    /* ================= */
    /* LIFECYCLE HOOK(S) */
    /* ================= */

    async componentDidMount() {
        let isServerUp = false;
        // Get JSON
        await fetch("https://imr3-react.herokuapp.com/backend")
            .then(res => res.json())
            .then(result => {
                console.log(result)
                this.setState({
                    data_loaded: true,
                    data: result
                });
                isServerUp = true;
            })
            .catch(error => {
                console.log(backup_data)
                this.setState({
                    data_loaded: true,
                    data: backup_data
                });
                isServerUp = false;
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);

            });

        if(isServerUp) this.initWebsocket();
    }

    /* =================== */
    /* WEBSOCKET METHOD(S) */
    /* =================== */

    initWebsocket() {
        const URL = "wss://imr3-react.herokuapp.com";
        this.ws = new WebSocket(URL);

        this.ws.onopen = () => {
            console.log("connected");
            this.setState({
                connected: true
            });
        };

        this.ws.onmessage = evt => {
            const messages = JSON.parse(evt.data);
            messages.map(message => this.addMessage(message));
        };

        this.ws.onclose = () => {
            console.log("disconnected, reconnect.");
            this.setState({
                connected: false,
            });
            this.initWebsocket()
        };
    }

    addMessage(message) {
        if (this.ws !== undefined) {
            let stateMessages = this.state.messages;
            stateMessages.push(message)
            this.setState({messages: stateMessages});
        }
    }

    submitMessage = (pseudoString, messageString, momentTimestamp = undefined) => {
        let message = momentTimestamp === undefined
            ? {name: pseudoString, message: messageString}
            : {name: pseudoString, message: messageString, moment: momentTimestamp};
        this.ws.send(JSON.stringify(message));
    };

    /* =============== */
    /* VIDEO METHOD(S) */
    /* =============== */

    goToVideoChapter(index) {
        const timeToSet = this.state.data.Chapters[index].pos;
        console.log(timeToSet);
        this.videoPlayer.setCurrentTime(timeToSet);
    }

    goToVideoTimestamp(timestamp) {
        this.videoPlayer.setCurrentTime(parseInt(timestamp));
    }

    updateCurrentTimes(state) {
        this.map.updateState(state);
        this.keywords.updateState(state);
        this.chapters.updateState(state);
        this.chatWriter.updateVideoState(state);
    }

    /* ========= */
    /* RENDERING */
    /* ========= */

    render() {
        const {data_loaded, data} = this.state;

        if (data_loaded) {
            return (
                <Container fluid>
                    <Row>
                        <Col xs={{ span: 12, order: 2 }} sm={{ span: 6, order: 2 }} md={{ span: 12, order: 3 }} lg={{ span: 3, order: 1 }} className={"tab p-3 border-right"}>
                            <VideoChapters
                                ref={chapters => {
                                    this.chapters = chapters
                                }}
                                chapters={data.Chapters}
                                onChapterClick={(index) => this.goToVideoChapter(index)}/>
                            <Keywords
                                ref={keywords => {
                                    this.keywords = keywords
                                }}
                                keywords={data.Keywords}/>
                        </Col>
                        <Col xs={{ span: 12, order: 1 }} sm={{ span: 12, order: 1 }} md={{ span: 7, order: 1 }} lg={{ span: 6, order: 2 }} className="p-3">
                            <main>
                                <VideoPlayer
                                    ref={videoPlayer => {
                                        this.videoPlayer = videoPlayer
                                    }}
                                    film={data.Film}
                                    onStateChange={(state) => this.updateCurrentTimes(state)}/>
                                <MapView
                                    ref={map => {
                                        this.map = map
                                    }}
                                    onMarkerClick={(timestamp) => this.goToVideoTimestamp(timestamp)}
                                    waypoints={data.Waypoints}/>
                            </main>
                        </Col>
                        <Col xs={{ span: 12, order: 3 }} sm={{ span: 6, order: 3 }} md={{ span: 5, order: 2 }} lg={{ span: 3, order: 3 }} className="p-0">
                            <aside className="chat">
                                <ChatRoom
                                    messages={this.state.messages}
                                    onMomentClick={(timestamp) => this.goToVideoTimestamp(timestamp)}/>
                                <hr/>
                                <ChatWriter
                                    ref={chatWriter => {
                                        this.chatWriter = chatWriter
                                    }}
                                    onSendMessage={this.submitMessage}/>
                            </aside>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <div className="App">
                    <p>Loading data</p>
                </div>
            )
        }
    }
}

export default App;
