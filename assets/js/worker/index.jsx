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
    console.log("aaaa")
    let jobslist = get_jobs()
    console.log(jobslist)
    jobslist = _.map([...jobs], ([_, job]) => {
        return (
            <div className="col">
                <p>{job.jobname} </p>
                <p>{job.desc} </p>
                <p>{job.code} </p>
                <p>{job.budgethours} </p>
                <p>{job.manager} </p>
            </div>
        );
    });

    return (
        <div>
            <h1>All Available Jobs</h1>
            <div className="row">
                {jobslist}
            </div>
        </div>
    );
});

export default WorkerIndex;