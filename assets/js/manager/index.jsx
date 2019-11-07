import React from 'react';
import ReactDOM from 'react-dom';

import {Form, Button, Nav} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

export default function ManagerIndex(props) {
    return (
        <div>
            <h1>Manager Main Page</h1>
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