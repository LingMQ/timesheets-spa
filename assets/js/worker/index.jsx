import React from 'react';
import ReactDOM from 'react-dom';

import {Form, Button, Nav, Col} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

import { connect } from 'react-redux';
import {get_user_by_id, get_jobs_by_id} from '../ajax';

import _ from 'lodash';

/*
export default function WorkerIndex(props) {
    return (
        <div>
            <h1>Worker Main Page</h1>
            <h3> All available jobs </h3>

            <Nav>
                <Nav.Item>
                    <NavLink to="/" exact activeClassName="active" className="nav-link">
                        Back
                    </NavLink>
                </Nav.Item>
            </Nav>
        </div>
    );
} */

let WorkerIndex = connect(({jobs}) => ({jobs}))(({jobs}) => {
    let user_id = 0;
    let manager_id = 0;
    if (JSON.parse(localStorage.getItem("session"))) {
        user_id = JSON.parse(localStorage.getItem("session")).user_id;
        manager_id = JSON.parse(localStorage.getItem("session")).manager_id;
    }

    let id_needed = manager_id;
    if (manager_id == -1) {
        id_needed = user_id;
    }

    console.log("needed id")
    console.log(id_needed)
    let jobslist = get_jobs_by_id(id_needed)
    jobslist = _.map([...jobs], ([_, job]) => {
        return (
            <tr>
                <td>{job.jobname} </td>
                <td>{job.desc} </td>
                <td>{job.code} </td>
                <td>{job.budgethours} </td>
                <td>{job.manager} </td>
            </tr>
        );
    });

    return (
        <div>
            <h1>All My Available Jobs</h1>
            <p>** Only the jobs that I can work on (meaning the job my manager is supervising) will show in below. </p>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Jobname</th>
                    <th>Desc</th>
                    <th>Code</th>
                    <th>Budgethours</th>
                    <th>Supervisor_ID</th>
                </tr>
                </thead>
                <tbody>
                    {jobslist}
                </tbody>
            </table>

            <Form>
                <Form.Row>
                    <Form.Label>date</Form.Label>
                    <input type="date" className="form_control mr-sm-2" onChange={(en) => this.handle_date_change(en)}/>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridJob">
                        <Form.Label>Job</Form.Label>
                        <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(0, en)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridHour">
                        <Form.Label>Hour</Form.Label>
                        <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(0, en)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNote">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control type="description" placeholder="Notes" onChange={(en) =>this.handel_change_note(0, en)}/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridJob">
                        <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(0, en)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridHour">
                        <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(0, en)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNote">
                        <Form.Control type="description" placeholder="Notes" onChange={(en) =>this.handel_change_note(0, en)}/>
                    </Form.Group>
                </Form.Row>

            </Form>

            <Nav>
                <Nav.Item>
                    <NavLink to="/" exact activeClassName="active" className="nav-link">
                        Back
                    </NavLink>
                </Nav.Item>
            </Nav>
        </div>
    );
});

export default WorkerIndex;