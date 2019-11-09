import React from 'react';

import { Nav } from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux';
import { get_jobs_by_id } from '../ajax';

import _ from 'lodash';
import CreateSheet from "./create_ts";

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
            <p>** Only jobs that I can work on (meaning: jobs my manager supervises) will show in the below. </p>
            <Nav>
                <Nav.Item>
                    <NavLink to="/" exact activeClassName="active" className="nav-link">
                        Back to Welcome Page
                    </NavLink>
                </Nav.Item>
            </Nav>
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

            <div>
            <CreateSheet />
            </div>
        </div>
    );
});

export default WorkerIndex;