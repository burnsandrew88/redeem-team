import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import { Col, Row, Container } from "../components/Grid";
// import { Input, FormBtn } from "../components/Form";
import { Card, CardHeader, CardBody } from "../components/Card";
import Button from "react-bootstrap/Button";
import {withRouter} from 'react-router-dom';



class Events extends Component {
    state = {
        events: []
    };
    componentDidMount() {
        this.loadEvents();
    }
    loadEvents = () => {
        API.getEvents()
            .then(res => {
                console.log(res)
                this.setState({ events: res.data })
            })
            .catch(err => console.log(err));
    };
    render() {

        const MoreDetails = withRouter(({ history }, event) => (
            <Button href="" className="float-left btn btn-dark" onClick={(e) => {
                e.preventDefault();
                history.push(`/details/${event._id}`)
            }}>See More Details</Button>
          ))

          const Register = withRouter(({ history }, event) => (
            <Button href="" className="float-right btn btn-dark" onClick={(e) => {
                e.preventDefault();
                history.push(`/register/${event._id}`)
            }}>Register Here</Button>
          ))
        return (
            <Container fluid>
                <Row>
                    <Col size={"md-12"}>
                        <Card id={"viewHeaderCard"}>
                            <Container fluid>
                                <Row>
                                    <Col size={"md-12"}>
                                        <Card id={"viewWordsCard"}>
                                            <CardHeader>
                                                <h1 id="viewEventsGamersUnited"><strong>Gamers United</strong></h1>
                                                <h3 id="eventsbanner">Events in your Area</h3>
                                            </CardHeader>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                        <Container fluid>
                            <Row>
                                <Col size={"md-12"}>
                                    <Card id={"viewMainContainer"}>
                                        <CardBody>
                                            <Col size={"md-12"}>
                                                {this.state.events.length ? (
                                                    <List id={"viewOverflow"}>
                                                        {this.state.events.map(event => (
                                                            <ListItem key={event._id} className="mt-2">
                                                                <Card id="maineventsCard">
                                                                    <CardBody>
                                                                        <Row>
                                                                            <Col size="md-3">
                                                                                <img src={event.ImgSrc} alt={event.ImgSrc} width="100%" length="100%" />
                                                                            </Col>
                                                                            <Col size="md-6">
                                                                                <div className="text-center">
                                                                                    <strong>
                                                                                        {event.Name}<br />
                                                                                        on {event.Date}<br />
                                                                                        at {event.LocationName} <br />
                                                                                        {event.AddressLine1}<br />
                                                                                        {event.AddressLine2}<br />
                                                                                        {event.City}<br />
                                                                                        {event.State}<br />
                                                                                        {event.Zip}<br />
                                                                                        {event.Game}<br />
                                                                                        {event.Console}<br />
                                                                                    </strong>
                                                                                </div>
                                                                                <br />
                                                                            </Col>
                                                                            <Col size="md-3">{event.mapSrc}</Col>

                                                                        </Row>
                                                                        <Row fluid>
                                                                            <Col>
                                                                                <div className="text-center">
                                                                                    {event.Description}
                                                                                </div>
                                                                                <br />
                                                                            </Col>
                                                                            <Col>
                                                                                <MoreDetails></MoreDetails>
                                                                                <Register></Register>
                                                                            </Col>
                                                                        </Row>
                                                                    </CardBody>
                                                                </Card>
                                                            </ListItem>))}
                                                    </List>
                                                ) : (
                                                        <Card>
                                                            <h3 id="eventsbanner">No Results to Display</h3>
                                                        </Card>
                                                    )}
                                            </Col>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>

            </Container>
        )
    }
}

export default Events;