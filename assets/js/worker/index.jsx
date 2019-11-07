import React from 'react';
import ReactDOM from 'react-dom';

import {Form, Button, Nav} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

import { connect } from 'react-redux';
import { get_jobs } from '../ajax';

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
    let jobslist = get_jobs()
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
            <h1>All Available Jobs</h1>
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