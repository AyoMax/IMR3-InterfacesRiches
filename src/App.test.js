import {render} from '@testing-library/react';
import App from './App';

beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
            status: 200,
            json: () => {
                return Promise.resolve({
                    "Film": {
                        "file_url": "https://ia801406.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4",
                        "title": "Route 66, An American (Bad) Dream",
                        "synopsis_url": "https://wiki.creativecommons.org/wiki/Route_66_-_An_American_(bad)_Dream"
                    },
                    "Chapters": [
                        {
                            "pos": "0",
                            "title": "Start"
                        },
                        {
                            "pos": "45",
                            "title": "Intro"
                        },
                        {
                            "pos": "117",
                            "title": "New Mexico"
                        },
                        {
                            "pos": "237",
                            "title": "Credits"
                        },
                        {
                            "pos": "300",
                            "title": "Washington DC, 2 weeks earlier"
                        },
                        {
                            "pos": "970",
                            "title": "White House"
                        },
                        {
                            "pos": "1250",
                            "title": "Hitting the road"
                        },
                        {
                            "pos": "1620",
                            "title": "Leaving New York"
                        },
                        {
                            "pos": "2100",
                            "title": "Motels"
                        },
                        {
                            "pos": "3250",
                            "title": "Chicago"
                        },
                        {
                            "pos": "3610",
                            "title": "Route 66, finally"
                        },
                        {
                            "pos": "3850",
                            "title": "Leaving Amarillo"
                        },
                        {
                            "pos": "4400",
                            "title": "Stranded in the desert"
                        },
                        {
                            "pos": "5090",
                            "title": "Vegas"
                        },
                        {
                            "pos": "5780",
                            "title": "Searching Hollywood"
                        },
                        {
                            "pos": "5880",
                            "title": "San Diego"
                        },
                        {
                            "pos": "5955",
                            "title": "Credits"
                        }
                    ],
                    "Waypoints": [
                        {
                            "lat": "32.42",
                            "lng": "-90.13",
                            "label": "Ridgeland",
                            "timestamp": "45"
                        },
                        {
                            "lat": "38.90",
                            "lng": "-77.04",
                            "label": "Washington DC",
                            "timestamp": "300"
                        },
                        {
                            "lat": "40.73",
                            "lng": "-73.93",
                            "label": "New York",
                            "timestamp": "1940"
                        },
                        {
                            "lat": "41.88",
                            "lng": "-87.63",
                            "label": "Chicago",
                            "timestamp": "3250"
                        },
                        {
                            "lat": "35.22",
                            "lng": "-101.83",
                            "label": "Amarillo",
                            "timestamp": "3750"
                        },
                        {
                            "lat": "36.17",
                            "lng": "-115.14",
                            "label": "Las Vegas",
                            "timestamp": "5210"
                        },
                        {
                            "lat": "34.09",
                            "lng": "-118.33",
                            "label": "Hollywood",
                            "timestamp": "5780"
                        },
                        {
                            "lat": "32.72",
                            "lng": "-117.16",
                            "label": "San Diego",
                            "timestamp": "5780"
                        }
                    ],
                    "Keywords": [
                        {
                            "pos": "0",
                            "data": [
                                {
                                    "title": "Route 66",
                                    "url": "https://en.wikipedia.org/wiki/U.S._Route_66"
                                },
                                {
                                    "title": "Stefan Kluge",
                                    "url": "http://www.imdb.com/name/nm1667631/"
                                },
                                {
                                    "title": "Mathias Einmann",
                                    "url": "http://www.imdb.com/name/nm1667578/"
                                }
                            ]
                        },
                        {
                            "pos": "117",
                            "data": [
                                {
                                    "title": "New Mexico",
                                    "url": "https://en.wikipedia.org/wiki/New_Mexico"
                                },
                                {
                                    "title": "Cadillac",
                                    "url": "https://en.wikipedia.org/wiki/Cadillac_Series_62"
                                }
                            ]
                        },
                        {
                            "pos": "300",
                            "data": [
                                {
                                    "title": "Washington DC",
                                    "url": "https://en.wikipedia.org/wiki/Washington,_D.C."
                                }
                            ]
                        },
                        {
                            "pos": "970",
                            "data": [
                                {
                                    "title": "White House",
                                    "url": "https://en.wikipedia.org/wiki/White_House"
                                }
                            ]
                        },
                        {
                            "pos": "1620",
                            "data": [
                                {
                                    "title": "New York",
                                    "url": "https://en.wikipedia.org/wiki/New_York_City"
                                }
                            ]
                        },
                        {
                            "pos": "2100",
                            "data": [
                                {
                                    "title": "Motels",
                                    "url": "https://en.wikipedia.org/wiki/Motel"
                                },
                                {
                                    "title": "Jump start",
                                    "url": "https://en.wikipedia.org/wiki/Jump_start_(vehicle)"
                                }
                            ]
                        },
                        {
                            "pos": "3250",
                            "data": [
                                {
                                    "title": "Chicago",
                                    "url": "https://en.wikipedia.org/wiki/Chicago"
                                }
                            ]
                        },
                        {
                            "pos": "3850",
                            "data": [
                                {
                                    "title": "Amarillo",
                                    "url": "https://en.wikipedia.org/wiki/Amarillo,_Texas"
                                },
                                {
                                    "title": "Cadillac Ranch",
                                    "url": "https://en.wikipedia.org/wiki/Cadillac_Ranch"
                                }
                            ]
                        },
                        {
                            "pos": "5090",
                            "data": [
                                {
                                    "title": "Las Vegas",
                                    "url": "https://en.wikipedia.org/wiki/Las_Vegas"
                                },
                                {
                                    "title": "The Strip",
                                    "url": "https://en.wikipedia.org/wiki/Las_Vegas_Strip"
                                }
                            ]
                        },
                        {
                            "pos": "5780",
                            "data": [
                                {
                                    "title": "Hollywood",
                                    "url": "https://en.wikipedia.org/wiki/Hollywood"
                                }
                            ]
                        },
                        {
                            "pos": "5880",
                            "data": [
                                {
                                    "title": "San Diego",
                                    "url": "https://en.wikipedia.org/wiki/San_Diego"
                                }
                            ]
                        }
                    ]
                });
            }
        });
    });
});

// test("contains menu after async fetch", async () => {
//     const {container} = render(<App/>);
//     const menu = await waitForElement(() =>
//         container.querySelector(`[id="menu"]`));
//     expect(menu).toBeInDocument();
// });

test("Backend is called", () => {
    render(<App/>);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://imr3-react.herokuapp.com/backend');
})

afterAll(() => {
    fetch.mockClear();
});
