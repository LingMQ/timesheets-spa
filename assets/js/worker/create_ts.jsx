import React from 'react';

import { connect } from 'react-redux';
import { Form, Button, Col} from 'react-bootstrap';
import { Redirect} from 'react-router';

import { create_sheet } from '../ajax';

class CreateSheet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            date: null,
            job_codes: ["", "", "", "", "", "", "", ""],
            hours: [0, 0, 0, 0, 0, 0, 0, 0],
        };
    }

    handel_change_hour(i, e) {
        let state_hours = this.state.hours;
        state_hours[i] = e.target.value;
        this.setState({
            hours: state_hours,
        }, () => {console.log(this.state.hours)});
    }

    handel_change_job_code(i, e) {
        // change job code
        let state_codes = this.state.job_codes;
        state_codes[i] = e.target.value;
        this.setState({
            job_codes: state_codes,
        }, () => {console.log(this.state.job_codes)});
    }

    handle_date_change(e) {
        this.setState({
            date: e.target.value,
        }, () => {console.log(this.state.date)});
    }

    changed(data) {
        this.props.dispatch({
            type: "CREATE_NEW_SHEET",
            data: data
        });
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return(
            <div>
                <Form>
                    <Form.Row>
                        <Form.Label>Date</Form.Label>
                        <input type="date" className="form_control mr-sm-2" onChange={(en) => this.handle_date_change(en)}/>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridJob">
                            <Form.Label>Job Code</Form.Label>
                            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(0, en)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridHour">
                            <Form.Label>Hour</Form.Label>
                            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(0, en)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridJob">
                            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(1, en)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridHour">
                            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(1, en)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridJob">
                            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(2, en)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridHour">
                            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(2, en)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridJob">
                            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(3, en)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridHour">
                            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(3, en)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridJob">
                            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(4, en)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridHour">
                            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(4, en)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridJob">
                            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(5, en)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridHour">
                            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(5, en)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridJob">
                            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(6, en)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridHour">
                            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(6, en)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridJob">
                            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(7, en)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridHour">
                            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(7, en)}/>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" onClick={() => {
                        this.changed({
                            workerid: JSON.parse(localStorage.getItem("session")).user_id,
                            date: this.state.date,
                            job_codes: this.state.job_codes,
                            hours: this.state.hours,
                        });
                        create_sheet(this);
                    }}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

function state2props(state) {
    return state.tss;
}

export default connect(state2props)(CreateSheet);