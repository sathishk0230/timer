import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import {
  Container,
  Row,
  Navbar,
  FloatingLabel,
  Form,
  Col,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { runTimer } from "./Utilities";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      hour: 0,
      min: 0,
      sec: 10,
      autoRepeat: true,
      secondsLeft: 0,
      totalSeconds: 0,
      eventID: 0,
      refreshEventID: 0,
    };
  }
  startTimer = () => {
    let seconds =
      Number(this.state.hour * 60 * 60) +
      Number(this.state.min * 60) +
      Number(this.state.sec);
    console.log("seconds", seconds, this.state);
    if (seconds < 10) {
      alert("Minimum Timer duration is 10seconds!");
      return;
    }
    let eventID = runTimer(seconds, this.state.autoRepeat, this.stopTimer);
    this.setState({
      eventID,
      secondsLeft: seconds,
      totalSeconds: seconds,
      running: true,
    });
    this.refresh();
  };
  refresh = () => {
    let refreshEventID = setInterval(() => {
      this.setState((state, props) => {
        let secondsLeft =
          state.secondsLeft - 1 > 0
            ? state.secondsLeft - 1
            : state.totalSeconds;
        return { secondsLeft };
      });
    }, 1000);
    this.setState({ refreshEventID });
  };
  stopTimer = () => {
    clearInterval(this.state.eventID);
    clearInterval(this.state.refreshEventID);
    this.setState({ running: false });
  };
  handleChange = (e) => {
    const name = e.target.name;
    const value = name === "autoRepeat" ? e.target.checked : e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    let percentage =
      ((this.state.totalSeconds - this.state.secondsLeft) /
        this.state.totalSeconds) *
      100;
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Timer</Navbar.Brand>
          </Container>
        </Navbar>
        <Container>
          <Row>
            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="hours" label="Hours">
                  <Form.Control
                    type="number"
                    name="hour"
                    max={24}
                    min={0}
                    placeholder="0"
                    disabled={this.state.running}
                    value={this.state.hour}
                    onChange={this.handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="minutes" label="Minutes">
                  <Form.Control
                    type="number"
                    name="min"
                    max={60}
                    min={0}
                    placeholder="5"
                    disabled={this.state.running}
                    value={this.state.min}
                    onChange={this.handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="seconds" label="Seconds">
                  <Form.Control
                    type="number"
                    name="sec"
                    max={60}
                    min={0}
                    placeholder="0"
                    disabled={this.state.running}
                    value={this.state.sec}
                    onChange={this.handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="auto-repeat"
                  style={{ position: "relative", marginTop: "10%" }}
                >
                  <Form.Check
                    type="checkbox"
                    name="autoRepeat"
                    label="Auto Repeat"
                    checked={this.state.autoRepeat}
                    disabled={this.state.running}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            {this.state.running && (
              <div className="mt-3">
                <ProgressBar
                  now={percentage}
                  label={`${percentage.toFixed(0)}%`}
                />
              </div>
            )}
          </Row>
          <div className="d-grid gap-2 mt-3">
            {this.state.running ? (
              <Button variant="danger" size="lg" onClick={this.stopTimer}>
                Stop
              </Button>
            ) : (
              <Button variant="primary" size="lg" onClick={this.startTimer}>
                Start
              </Button>
            )}
          </div>
        </Container>
      </>
    );
  }
}

export default App;
