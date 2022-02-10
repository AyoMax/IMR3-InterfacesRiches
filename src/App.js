import React from "react";
import './App.scss';
import {VideoPlayer} from "./components/VideoPlayer/VideoPlayer";
import {VideoChapters} from "./components/VideoChapters/VideoChapters";
import {MapView} from "./components/MapView/MapView";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {Keywords} from "./components/Keywords/Keywords";
import {Chat} from "./components/Chat/Chat";

let backup_data = require('./data.json');


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            minTimeToLoad: false,
            data_loaded: false,
            data: {}
        }
    }

    async componentDidMount() {
        this.minTimeToLoad(1000)

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
    }

    minTimeToLoad(time){
        setTimeout(() => {
            this.setState({
                minTimeToLoad: true
            })
        }, time)
    }

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
        this.chat.updateVideoState(state);
    }

    /* ========= */
    /* RENDERING */

    /* ========= */

    render() {
        const {data_loaded, data, minTimeToLoad} = this.state;

        if (data_loaded && minTimeToLoad) {
            return (
                <Container fluid>
                    <Row>
                        <Col xs={{span: 12, order: 2}} sm={{span: 6, order: 2}} md={{span: 12, order: 3}}
                             lg={{span: 3, order: 1}} className={"tab p-3 border-right"}>
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
                        <Col xs={{span: 12, order: 1}} sm={{span: 12, order: 1}} md={{span: 7, order: 1}}
                             lg={{span: 6, order: 2}} className="p-3">
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
                        <Col xs={{span: 12, order: 3}} sm={{span: 6, order: 3}} md={{span: 5, order: 2}}
                             lg={{span: 3, order: 3}} className="p-0">
                            <Chat ref={chat => {
                                this.chat = chat
                            }} onMomentClick={(timestamp) => this.goToVideoTimestamp(timestamp)}/>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <div className="App d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant="info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )
        }
    }
}

export default App;
