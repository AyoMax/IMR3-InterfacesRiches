import React from "react";
import './App.css';
import {VideoPlayer} from "./components/VideoPlayer";
import {VideoChapters} from "./components/VideoChapters";
import {ChatRoom} from "./components/ChatRoom";
import {ChatWriter} from "./components/ChatWriter";
import {Map} from "./components/Map";
import {Col, Container, Row, Tabs, Tab} from "react-bootstrap";
import {Keywords} from "./components/Keywords";

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
        // Get Websocket
        const URL = "wss://imr3-react.herokuapp.com";
        this.setState({
            connected: false,
            ws: new WebSocket(URL)
        });

        // Catch websocket events
        // this.state.ws.onopen = () => {
        //     console.log("connected");
        //     this.setState({
        //         connected: true
        //     });
        // };
        //
        // this.state.ws.onmessage = evt => {
        //     const messages = JSON.parse(evt.data);
        //     messages.map(message => this.addMessage(message));
        // };
        //
        // this.state.ws.onclose = () => {
        //     console.log("disconnected, reconnect.");
        //     this.setState({
        //         connected: false,
        //         ws: new WebSocket(URL)
        //     });
        // };
    }

    addMessage(message) {
        this.state.messages.push(message);
    }

    submitMessage = messageString => {
        const message = {name: "Yoan", message: "test"};
        console.log(message);
        this.state.ws.send(JSON.stringify(message));
    };

    /* =============== */
    /* VIDEO METHOD(S) */
    /* =============== */

    goToVideoChapter(index) {
        const timeToSet = this.state.data.Chapters[index].pos;
        this.videoPlayer.setCurrentTime(timeToSet);
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
                        <Col md="8">
                            <main>
                                <VideoPlayer
                                    ref={videoPlayer => {
                                        this.videoPlayer = videoPlayer
                                    }}
                                    film={data.Film}/>
                                <Tabs defaultActiveKey="chapters">
                                    <Tab
                                        eventKey="chapters"
                                        title="Chapitres"
                                    >
                                        <VideoChapters chapters={data.Chapters}
                                                       onChapterClick={(index) => this.goToVideoChapter(index)}/>
                                    </Tab>
                                    <Tab
                                        eventKey="map"
                                        title="Carte"
                                    >
                                        <Map waypoints={data.Waypoints}/>
                                    </Tab>
                                    <Tab
                                        eventKey="keywords"
                                        title="Mots clés"
                                    >
                                        <Keywords keywords={data.Keywords}/>
                                    </Tab>
                                </Tabs>
                            </main>
                        </Col>
                        <Col md="4">
                            <aside>
                                <ChatRoom
                                    messages={this.state.messages}
                                    onMomentClick={(seconds) => this.videoPlayer.setCurrentTime(seconds)}/>
                                <ChatWriter onSendMessage={message => this.submitMessage(message)}/>
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
