import React from 'react';
import ReactDOM from 'react-dom';

import {Form, Button, Nav} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

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
}