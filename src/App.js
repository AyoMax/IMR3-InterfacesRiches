import React from "react";
import './App.scss';
import {VideoPlayer} from "./components/VideoPlayer/VideoPlayer";
import {VideoChapters} from "./components/VideoChapters/VideoChapters";
import {ChatRoom} from "./components/ChatRoom/ChatRoom";
import {ChatWriter} from "./components/ChatWriter/ChatWriter";
import {MapView} from "./components/MapView/MapView";
import {Col, Container, Row, Tabs, Tab} from "react-bootstrap";
import {Keywords} from "./components/Keywords/Keywords";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data_loaded: false,
            data: {},
            messages: []
        }
    }

    /* ================= */
    /* LIFECYCLE HOOK(S) */
    /* ================= */

    componentDidMount() {
        // Get JSON
        fetch("https://imr3-react.herokuapp.com/backend")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    data_loaded: true,
                    data: result
                });
            });

        this.initWebsocket();
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
            this.ws = new WebSocket(URL)
        };
    }

    addMessage(message) {
        let stateMessages = this.state.messages;
        stateMessages.push(message)
        this.setState({messages: stateMessages});
    }

    submitMessage = (pseudoString, messageString) => {
        const message = {name: pseudoString, message: messageString};
        this.ws.send(JSON.stringify(message));
    };

    /* =============== */
    /* VIDEO METHOD(S) */
    /* =============== */

    goToVideoChapter(index) {
        const timeToSet = this.state.data.Chapters[index].pos;
        console.log(timeToSet)
        this.videoPlayer.setCurrentTime(timeToSet);
    }

    goToVideoTimestamp(timestamp) {
        this.videoPlayer.setCurrentTime(parseInt(timestamp) + 5);
    }

    updateCurrentTimes(state) {
        this.map.updateState(state)
        this.keywords.updateState(state)
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
                        <Col md="3">
                            <Tabs defaultActiveKey="chapters">
                                <Tab
                                    eventKey="chapters"
                                    title="Chapitres"
                                >
                                    <VideoChapters chapters={data.Chapters}
                                                   onChapterClick={(index) => this.goToVideoChapter(index)}/>
                                </Tab>
                                <Tab
                                    eventKey="keywords"
                                    title="Mots clés"
                                >
                                    <Keywords
                                        ref={keywords => {
                                            this.keywords = keywords
                                        }}
                                        keywords={data.Keywords}/>
                                </Tab>
                            </Tabs>
                        </Col>
                        <Col md="6">
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
                        <Col md="3">
                            <aside className="chat">
                                <ChatRoom
                                    messages={this.state.messages}
                                    onMomentClick={(seconds) => this.videoPlayer.setCurrentTime(seconds)}/>
                                <hr/>
                                <ChatWriter onSendMessage={this.submitMessage}/>
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
